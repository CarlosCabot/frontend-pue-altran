<?php include("admin_cabecera1.php") ?>
    
    <link rel="stylesheet" href="../css/estadisticas.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.bundle.js"></script>
    
<?php include("admin_cabecera2.php") ?>    
    
               <!-- Insert content here -->
                <h1 class="page-header">Estadísticas</h1>

                <div class="control">
                  <a href="#" id="barra" class="control-boton">Notas medias por temas</a>
                  <a href="#" id="pie" class="control-boton">% de aprobados global</a>
                </div>

                <div class="row placeholders">
                    <div class="myChart col-xs-6 col-sm-6 placeholder">                      
                        <div class="container-chart" style="margin-top:50px;">
                            <canvas id="myChart"></canvas>
                        </div>
                    </div>
                    <div class="myPie col-xs-6 col-sm-6 placeholder">
                      
                        <div class="container-pie">
                            <canvas id="myPie"></canvas>
                        </div>
                    </div>
                </div>          
                            
<?php include("cierre.php") ?>
       <script src="../js/estadisticas.js"></script>
        <script>
            $("#li_estadisticas").addClass("active");  
        </script>
    
    </body>
</html>
