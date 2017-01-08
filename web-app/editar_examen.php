<?php include("admin_cabecera1.php") ?>
    
    <!-- Editar exam styles -->
    <link href="../css/editar_examen.css" rel="stylesheet">
    
<?php include("admin_cabecera2.php") ?>
    
               <!-- Insert content here -->
                <h1 class="page-header">Editar examen</h1>
                <div id="selector" class="form-horizontal"> </div>
                <div id="metaInfoExamen" class="form-horizontal"> </div>
                <div id="contenidoExamen" class="form-horizontal">  </div>
                <div id="botones" style="display:none">
                    <button id="guardar_examen" class="btn btn-primary">Guardar cambios</button>
                    <button id="descartar" class="btn btn-danger">Descartar cambios</button>
                </div>   
                            
<?php include("cierre.php") ?>
      
       <script type="text/javascript" src="../js/edit_exam.js"></script>
        <script>
            $("#li_editar").addClass("active");  
        </script>
        
    </body>
</html>