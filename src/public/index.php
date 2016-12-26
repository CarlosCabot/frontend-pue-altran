<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
require '../classes/conexion.php';

session_start();

//To feed custom config into Slim, we need to change where we create the Slim/App object so that it now looks like this:
$app = new \Slim\App(["settings" => $config]);
$app->contentType('text/html; charset=utf-8');

//Add Dependencies
$container = $app->getContainer();

//Use Monolog, a logging framework for PHP applications
$container['logger'] = function($c) {
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
    $logger->pushHandler($file_handler);
    return $logger;
};

//Add A Database Connection using PDO
$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO(
        "mysql:host=".$db['host'].";dbname=".$db['dbname'].";charset=utf8",
        $db['user'],
        $db['pass'],
        array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8") 
    );     
    //Really not necessary but these two settings make PDO itself much more usable as a library
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);    
    return $pdo;
};


/*
**   ROUTES
*/

//  Get all temas in JSON object format 
$app->get('/temas', function(Request $request, Response $response) {
    $sth = $this->db->prepare('SELECT * FROM tema ORDER BY id_tema');
    $sth->execute();
    $result = $sth->fetchAll();       
	return (json_encode($result, JSON_UNESCAPED_UNICODE));
});

//  Get all exam names in JSON object format 
$app->get('/examenes/all', function(Request $request, Response $response) {
    $sth = $this->db->prepare('SELECT id_examen, nombre FROM examen ORDER BY nombre');
    $sth->execute();
    $result = $sth->fetchAll();        
	return (json_encode($result, JSON_UNESCAPED_UNICODE));
});

//  Get all exam names by tema in JSON format 
$app->get('/examenes/{idT}', function($request, $response, $args) {
    $idT = $args['idT'];     
    $sth = $this->db->prepare("SELECT id_examen, nombre FROM examen WHERE id_tema = $idT ORDER BY id_examen");
    $sth->execute();
    $result = $sth->fetchAll();        
	return (json_encode($result, JSON_UNESCAPED_UNICODE));
});

// Load the selected exam info data into $_SESSION variable (to optimize the calls to database) and return exam time in minutes
$app->get('/examen/get/{idE}', function($request, $response, $args) { 
    //session_destroy();
    
    $idE = $args['idE'];         
    $sth = $this->db->prepare("SELECT examen_json, porcentaje_aprovar, tiempo_minutos FROM examen WHERE id_examen = $idE");
    $sth->execute();
    $examen = $sth->fetch();   
        
    // Saving % for passing exam in $_SESSION variable
    $porcentaje_aprovar = $examen["porcentaje_aprovar"];
    $_SESSION ['porcentaje_aprovar'] = $porcentaje_aprovar;
    
    // Saving % for passing exam in $_SESSION variable
    $tiempo_minutos = $examen["tiempo_minutos"];     
    $_SESSION ['tiempo_minutos'] = $tiempo_minutos;        
    
    $examen_json = $examen["examen_json"]; 
    $array_examen_frontend = json_decode($examen_json);  
    $array_examen_backend = json_decode($examen_json);  
    
    // Saving exam questions without solutions
    $_SESSION ['examen_frontend'] = $array_examen_frontend;  
    // Randomize the questions order
    shuffle ($_SESSION ['examen_frontend']);
    
    // Saving exam with solutions
    $_SESSION ['examen_backend'] = $array_examen_backend;  

    // Delete all solutions from 'examen_frontend'
    for( $i=0; $i < count($_SESSION ['examen_frontend']); $i++) {
          unset ($_SESSION['examen_frontend'][$i]->respuestas->solucion);
    }        
        
    // retornar el tiempo en minutos
    $response = array('tiempo' => $_SESSION ['tiempo_minutos']);
    return (json_encode($response, JSON_UNESCAPED_UNICODE));
});

// Get JSON from specific question, identified by idE (id_exam) & idP (id_pregunta) without the answer
$app->get('/examen/pregunta/{idP}', function($request, $response, $args) {    
    $idP = $args['idP'];    
    if($idP > count($_SESSION['examen_frontend'])){
        //no hay mas preguntas, id_pregunta es 0
        $arr = array('id_pregunta' => 0);
        return json_encode($arr);        
    }    
    return (json_encode($_SESSION['examen_frontend'][$idP-1], JSON_UNESCAPED_UNICODE));
});


// Recibir datos a insertar en BBDD y retornar si el usuario ha aprovado, con que nota y el porcentaje de aciertos
$app->post('/examen/finalizar', function (Request $request, Response $response){        
    //Getting parsed data from request 
    //Example data:
    //{ id_usuario: 1, id_examen: 1, fecha_hora: "2016-12-19 23:59:23", respuestas: [{id_pregunta:2, respuesta:"A"},{id_pregunta:1,respuesta:"A"}]}
    $object = $request->getParsedBody();       
    
    // Extract the variables needed to insert a new evaluation into the Database
    $id_usuario = $object['id_usuario'];   
    $id_examen = $object['id_examen'];
    $fecha_hora = $object['fecha_hora'];     
    $sth = $this->db->prepare("INSERT INTO evaluacion VALUES (NULL, $id_examen, '$fecha_hora', $id_usuario)");
    $sth->execute();  
    
    // Then obtain the id created for the new evaluation to use it on evaluacion_detalle
    $sth = $this->db->prepare("SELECT id_evaluacion FROM evaluacion
    WHERE id_usuario = $id_usuario AND id_examen = $id_examen AND fecha_hora = '$fecha_hora'");
    $data = $sth->execute(); 
    $data = $sth->fetch();    
    $id_evaluacion = $data['id_evaluacion'];
        
    // Getting the exam answers data, and compare it with the solutions           
    //$array_respuestas = $object->{'respuestas'};  
    $array_respuestas = $object['respuestas'];  
    $array_examen_backend = $_SESSION ['examen_backend'];
    
    $cantidad_preguntas = count($array_respuestas);
    $cantidad_aciertos = 0;
            
    // Find out which how many answers are correct
    for($i=0; $i < $cantidad_preguntas; $i++){        
        $id_pregunta = $array_respuestas[$i]->{'id_pregunta'};
        $respuesta = $array_respuestas[$i]->{'respuesta'}; 
        $solucion = $array_examen_backend[$id_pregunta-1]->{'respuestas'}->{'solucion'};        
        
        if($respuesta == $solucion){ //correcto!            
            $cantidad_aciertos++;            
        }                
    }    
                    
    $nota = ($cantidad_aciertos*10)/$cantidad_preguntas;
    $porcentaje_aciertos = ($cantidad_aciertos*100)/$cantidad_preguntas;    
    // Saving if the user has passed the test
    $aprovado = ($porcentaje_aciertos > $_SESSION['porcentaje_aprovar'] ? true : false); 

    // Insert evaluacion_dellate data from this exam into database
    $json_data = json_encode($array_respuestas);
    $sth = $this->db->prepare("INSERT INTO evaluacion_detalle VALUES (NULL, '$json_data', $aprovado, $nota, $porcentaje_aciertos, $id_evaluacion)");
    $sth->execute();       
        
    // Finally it returns the next data: aprovado, nota and porcentaje_aciertos, in JSON format
    $json = '{aprovado: $aprovado, nota: $nota, porcentaje_aciertos: $porcentaje_aciertos}';
    return (json_encode($result));
});

// Recibir datos del nuevo tema y insertarlo en BBDD
$app->post('/tema/new', function (Request $request, Response $response){ 
    //Getting parsed data from request 
    //Example data:
    //{ nombre: 'Programación' }
    $object = $request->getParsedBody();          
    // Extract the variables needed to insert a new tema into the Database
    $nombre_tema = $object['nombre'];          
    $sth = $this->db->prepare("INSERT INTO tema VALUES (NULL, $nombre_tema)");
    $sth->execute();      
});    
        
// Recibir datos del nuevo examen y guardarlo en BBDD
$app->post('/examen/new', function (Request $request, Response $response){       
    //Getting parsed data from request 
    //Example data:
    //{ nombre: 'Angular', id_tema: 1, examen_json: '[{"id_pregunta":1,"enunciado":"¿Como se denomina el lenguaje de estilos para navegador?","respuestas":{"A":"CSS","B":"HTML","C":"Javascript","D":"XML","solucion":"A"}},{"id_pregunta":2,"enunciado":"¿Como definiriamos el software Brackets?","respuestas":{"A":"como un IDE","B":"como un editor de texto","C":"como lenguaje de programación","D":"como aparatos","solucion":"B"}},{"id_pregunta":3,"enunciado":"¿Donde se ejecuta el lenguaje PHP?","respuestas":{"A":"En le navegador","B":"En mi casa","C":"En el servidor de aplicaciones php","D":"En ninguna de las anteriores","solucion":"C"}},{"id_pregunta":4,"enunciado":"¿Las siglas HTML son de?","respuestas":{"A":"Lenguaje de Programación de Hipertexto","B":"Lenguaje de Marcas de Ropa","C":"HyperText Markdown Language","D":"Lenguaje de Marcas de Hipertexto","solucion":"D"}},{"id_pregunta":5,"enunciado":"¿Finalizaremos el proyecto a tiempo?","respuestas":{"A":"Puede","B":"No","C":"Hombre claro","D":"¿Que proyecto?","solucion":"C"}}]', porcentaje_aprovar: 50, tiempo_minutos: 15}
    $object = $request->getParsedBody();    
    
    // Extract the variables needed to insert a new evaluation into the Database
    $nombre = $object['nombre'];   
    $id_tema = $object['id_tema'];
    $examen_json = $object['examen_json'];     
    $porcentaje_aprovar = $object['porcentaje_aprovar'];
    $tiempo_minutos = $object['tiempo_minutos']; 
        
    $sth = $this->db->prepare(" INSERT INTO examen VALUES (NULL, '$nombre',  $id_tema, '$examen_json', $porcentaje_aprovar, $tiempo_minutos)");
    $sth->execute();     
});

// Return the hole exam for edition purposes
$app->get('/examen/edition/{idE}', function($request, $response, $args) {    
    $idE = $args['idE'];         
    $sth = $this->db->prepare("SELECT * FROM examen WHERE id_examen = $idE");
    $sth->execute();    
    $examen = $sth->fetch();  
    return (json_encode($examen, JSON_UNESCAPED_UNICODE));
});

// Update exam from json data
$app->post('/examen/update', function($request, $response, $args) {    
    //Getting parsed data from request 
    $object = $request->getParsedBody();    
    
    //echo (json_encode($examen));    
    $id_examen = $examen["id_examen"];   
    $nombre = $examen["nombre"];    
    $id_tema = $examen["id_tema"]; 
    $examen_json = $examen["examen_json"]; 
    $porcentaje_aprovar = $examen["porcentaje_aprovar"];   
    $tiempo_minutos = $examen["tiempo_minutos"]; 
          
    $sth = $this->db->prepare("UPDATE examen SET nombre='$nombre', id_tema=$id_tema, examen_json='$examen_json', porcentaje_aprovar=$porcentaje_aprovar, tiempo_minutos=$tiempo_minutos WHERE id_examen=$id_examen");
    $sth->execute();           
});

// Return estadisticas
/*$app->get('/examen/estadisticas', function($request, $response, $args) { 
    
});*/

// Example
$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");
    return $response;
});

$app->run();