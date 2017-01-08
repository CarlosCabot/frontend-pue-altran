<?php
    session_start();
    if(!isset($_SESSION['logged']) || !isset($_SESSION['user_admin'])){            
            header("Location: ../index.html"); 
    }else{
        if(!$_SESSION['user_admin']){
             header("Location: inicio.php"); 
         }  
    }
?>