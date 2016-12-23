<?php

// get all temas
$app->get('/todos', function(Request $request, Response $response) {
    $sth = $this->db->prepare('SELECT * FROM tema ORDER BY idTema' );
    $sth->execute();
    $todos = $sth->fetchAll();
    //print_r ($todos);
    //print(json_encode($todos, JSON_UNESCAPED_UNICODE));
    //print_r (utf8_encode($todos[1]));
    //print_r ($todos);
    //json_encode($todos, JSON_UNESCAPED_UNICODE);
    return json_encode($todos, JSON_UNESCAPED_UNICODE);         
});

//Hacer el mapeo
//$mapper = new TicketMapper($this->db);

// Example
$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});
