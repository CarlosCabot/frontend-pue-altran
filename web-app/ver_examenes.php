<?php include("user_cabecera1.php") ?>

    <!-- Including custom style for this page -->
    <link rel="stylesheet" href="../css/inicio.css">
              
<?php include("user_cabecera2.php") ?>  

               <!-- Insert content here -->
                <h1 class="page-header">Mis exámenes</h1>
                <div id="container">
                    <div class="table-responsive">
                        <table class="table table-hover">                            
                        </table>
                    </div>                    
                </div>
            
<?php include("cierre.php") ?>
   
    <script>
        var global_id_user = <?php echo $_SESSION['user_id']; ?>;
    </script>   
                 
    <script type="text/javascript" src="../js/ver_examenes.js"></script>
    <script>
        $("#li_ver").addClass("active");  
    </script>
    
    </body>
</head>


