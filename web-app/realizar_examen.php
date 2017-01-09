<?php include("user_cabecera1.php") ?>

    <!-- Including custom style for this page -->
    <link href="../css/realizar_examen.css" rel="stylesheet">
              
<?php include("user_cabecera2.php") ?> 
  
               <!-- Insert content here -->
                <h1 class="page-header">Realizar examen</h1>
                <div id="container">
                    <form id="formTemas" action="javascript:void(0);" class="form-horizontal" onsubmit="selectedExam(); return false;">
                        <div class="form-group"> 
                            <label for="temaSelection" class="col-sm-3 control-label">Seleccionar Tema: </label>
                            <div class="col-sm-9">
                                <select id="temaSelection" name="temaSelection" class="form-control" required>
                                    <option value="">Seleccionar Tema</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>               
            
<?php include("cierre.php") ?>
            
    <script>
        var global_id_user = <?php echo $_SESSION['user_id']; ?>;
    </script>
    
    <script type="text/javascript" src="../js/realizar_examen.js"></script>
    
    <script>
        $("#li_realizar").addClass("active");  
    </script>
    
    </body>
</head>