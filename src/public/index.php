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
    $sth = $this->db->prepare('SELECT * FROM tema ORDER BY id_tema' );
    $sth->execute();
    $result = $sth->fetchAll();       
	return (json_encode($result, JSON_UNESCAPED_UNICODE));
});

//  Get all exam names in JSON object format 
$app->get('/examenes', function(Request $request, Response $response) {
    $sth = $this->db->prepare('SELECT id_examen, nombre FROM examen ORDER BY id_examen' );
    $sth->execute();
    $result = $sth->fetchAll();        
	return (json_encode($result, JSON_UNESCAPED_UNICODE));
});

// Get JSON from specific question, identified by idE (id_exam) & idP (id_pregunta) without the answer
$app->get('/examen/{idE}/{idP}', function($request, $response, $args) { 
    session_destroy();
    
    // If its the first question to send from this exam, the hole exam is saved in $_SESSION 
    // !!!! Don't forget to delete this 'examen_frontend' & 'examen_backend' when the exam is done. unset($_SESSION['examen']); !!!!
    if(!isset($_SESSION['examen_frontend']) || !isset($_SESSION['examen_backend'])){
        $idE = $args['idE']; 
        
        $sth = $this->db->prepare("SELECT examen_json FROM examen WHERE id_examen = $idE");
        $sth->execute();
        $examen = $sth->fetchAll();             
        $examen_json = $examen[0]["examen_json"]; 
        
        $array_examen_frontend = json_decode($examen_json);  
        $array_examen_backend = json_decode($examen_json);  
        
        // Exam without solutions
        $_SESSION ['examen_frontend'] = $array_examen_frontend;   
         // Exam with solutions
        $_SESSION ['examen_backend'] = $array_examen_backend;  
        
        // Delete all solutions from 'examen_frontend'
        for( $i=0; $i < count($_SESSION ['examen_frontend']); $i++) {
              unset ($_SESSION['examen_frontend'][$i]->respuestas->solucion);
        }          
    }   
    
    $idP = $args['idP'];    
    return (json_encode($_SESSION['examen_frontend'][$idP-1], JSON_UNESCAPED_UNICODE));
});


// Recibit datos a guardar en BBDD
$app->post('/examen/new', function (Request $request, Response $response){
    $data = $request->getParsedBody();
    
    $data[];
    
});


// Example
$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");
    return $response;
});

$app->run();