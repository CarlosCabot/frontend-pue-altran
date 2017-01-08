<?php
    // Definir constantes para la conexión
    define ("servidor","localhost:3306");
    define ("usuario","root");    
    define ("password","");
    define ("bd","exam_db");
    
    // Conectar
    $conexion = mysqli_connect(servidor, usuario, password, bd);
    if (!$conexion) {
        die("Error al conectar a la base de datos: ".mysqli_connect_error());
    }

    // Imponer a PHP la codificación de caracteres utf8
    mysqli_set_charset($conexion,"utf8");
?>