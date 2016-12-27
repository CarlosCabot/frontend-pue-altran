<?php
    //Config
    /*Turn this on in development mode to get information about errors (without it, Slim will at least log errors so if you’re using the built in PHP webserver then you’ll see them in the console output which is helpful)*/
    $config['displayErrorDetails'] = true;
    //Allows the web server to set the Content-Length header which makes Slim behave more predictably.
    $config['addContentLengthHeader'] = false;
    //Datos de acceso a la base de datos
    $config['db']['host']   = "localhost";
    $config['db']['user']   = "root";
    $config['db']['pass']   = "";
    $config['db']['dbname'] = "exam_db";

    $config['logger'] = [ 'name' => 'slim-app', 'level' => Monolog\Logger::DEBUG, 'path' => __DIR__ . '/../logs/app.log'];
