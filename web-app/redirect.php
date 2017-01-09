<?php
     session_start();
     if(!isset($_SESSION['logged']) || !isset($_SESSION['user_admin'])){            
         echo "not logged";            
     }else{            
         if($_SESSION['user_admin']){
             header("Location: inicio_adm.php");    
         }else{
             header("Location: inicio.php");
         }
         die();            
         echo $_SESSION["user_id"], $_SESSION["user_nif"], $_SESSION["user_nombre"], $_SESSION["user_apellido1"], $_SESSION["user_apellido2"],
        $_SESSION["user_fecha_nacimiento"], $_SESSION["user_email"], $_SESSION["user_img"], $_SESSION["user_admin"], $_SESSION['user_admin'];
    }     
?>