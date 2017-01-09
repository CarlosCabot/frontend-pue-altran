<?php include("admin_cabecera1.php") ?>
    
    <link href="../css/crear_examen.css" rel="stylesheet">
    
<?php include("admin_cabecera2.php") ?>

               <!-- Insert content here -->
                <h1 class="page-header">Crear examen</h1>
                <div id="contenedor">
                    <form action="javascript:void(0);" class="form-horizontal" onsubmit="crear_examen(); return false;">
                        <div class="form-group">
                            <label for="temaSelection" class="col-sm-3 control-label">Seleccionar tema:</label>
                            <div class="col-sm-9">
                                <select id="temaSelection" name="temaSelection" class="form-control" required>
                                    <option value="">Seleccionar tema</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="temaSelection" class="col-sm-3 control-label">Nombre examen: </label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" id="nombre_exam" name="nombre_exam" placeholder="Nombre del examen" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="temaSelection" class="col-sm-3 control-label">Porcentaje de aciertos: </label>
                            <div class="col-sm-9">
                                <input type="number" id="porcentaje" name="porcentaje" class="form-control" placeholder="Porcentaje de aciertos" required> 
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="temaSelection" class="col-sm-3 control-label">Duración examen: </label>
                            <div class="col-sm-9">
                                <input type="number" id="tiempo_minutos" name="tiempo_minutos" class="form-control" placeholder="Duración examen" required> 
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="temaSelection" class="col-sm-3 control-label">Descripción del examen: </label>
                            <div class="col-sm-9">
                                <textarea id="descipcion" rows="4" cols="50" placeholder="Descripción del examen" class="form-control" required></textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="temaSelection" class="col-sm-3 control-label"></label>
                            <div class="col-sm-9">
                                <input class="btn btn-primary" type="submit" value="Crear preguntas"> 
                            </div>
                        </div>
                    </form>
                </div>
                
<?php include("cierre.php") ?>
            
        <script type="text/javascript" src="../js/crear_examen.js"></script>
        <script>
            $("#li_crear").addClass("active");  
        </script>
        
    </body>
</html>