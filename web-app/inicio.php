<?php include("user_cabecera1.php") ?>
              
<?php include("user_cabecera2.php") ?>      

               <!-- Insert content here -->
                <h1 class="page-header"> Inicio</h1>
                <div class="marketing" style="text-align:center;margin-top:50px;">
                    <!-- Three columns of text below the carousel -->
                    <div class="row">
                       <div class="col-sm-1"></div>
                        <a href="realizar_examen.php">
                           <div class="col-sm-4 option_with_icon">
                                <div class="grey-circle">
                                    <i class="fa fa-pencil fa-5x" aria-hidden="true" ></i>
                                </div>
                                <h2>Realizar examen </h2>
                                <p> Selecciona el examen a realizar según temas e intenta responder a todas las preguntas antes del timing.<br> ¡Buena suerte!</p>
                            </div>
                        </a>
                        <div class="col-sm-2"></div>
                        <!-- /.col-lg-4 -->
                        <a href="ver_examenes.php"><div option_with_icon class="col-sm-4 option_with_icon">
                            <div class="grey-circle"><i class="fa fa-files-o fa-5x" aria-hidden="true"></i></div>
                                <h2>Ver mis exámenes </h2>
                                <p> Echa un vistazo a tu historial de exámenes y mira en detalle que preguntas acertaste y cuales no.</p>
                            </div>
                        </a>
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