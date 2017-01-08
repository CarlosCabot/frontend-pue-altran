<?php include("admin_cabecera1.php") ?>
   
    <link rel="stylesheet" href="../css/inicio_adm.css">
    
<?php include("admin_cabecera2.php") ?>   
                
               <!-- Insert content here -->
                <h1 class="page-header">Inicio</h1>
                <div class="container marketing" style="text-align:center;margin-top:50px;">
                    <!-- Three columns of text below the carousel -->
                    <div class="row">
                        <a href="crear_examen.php"><div class="col-lg-4">
                            <div class="grey-circle"><i class="fa fa-file-text fa-5x" aria-hidden="true" style="margin-left: 5px;"></i></div>
                            <h2>Crear examen </h2>
                            <p> Crea un nuevo examen rellenando un simple formulario y añade un nuevo test a los usuarios.</p>
                        </div></a>
                        <!-- /.col-lg-4 -->
                        <a href="editar_examen.php"><div class="col-lg-4">
                            <div class="grey-circle"><i class="fa fa-pencil-square-o fa-5x" aria-hidden="true" style="margin-left: 14px;margin-top: 4px;"></i></div>
                            <h2>Editar examen </h2>
                            <p> Edita un examen ya existente.</p>
                        </div></a>
                        <!-- /.col-lg-4 -->
                        <a href="estadisticas.php"><div class="col-lg-4">
                            <div class="grey-circle"><i class="fa fa-bar-chart fa-5x" aria-hidden="true" style="margin-left: 8px;"></i></div>
                            <h2>Panel de Estadísticas </h2>
                            <p> Estadísticas en tiempo real de los resultados globales.</p>
                        </div></a>
                        <!-- /.col-lg-4 -->
                    </div>
                    <!-- /.row -->
                </div>
                
<?php include("cierre.php") ?>
  
    <script>
        $("#li_inicio").addClass("active");  
    </script>
   
    </body>
</html>
