<?php include("admin_cabecera1.php") ?>

    <!-- Including custom style for this page -->
    <link rel="stylesheet" href="../css/editar_perfil.css">
              
<?php include("admin_cabecera2.php") ?>    
    
        <h1>Editar perfil</h1>
        <hr>
        <div class="row">
            <!-- left column -->
            <div class="col-md-3">
                <div class="text-center">
                    <img id="user_photo" src="../img/users/user-default.png" alt="avatar">
                    <h6>Subir otra foto...</h6>

                    <input type="file" class="form-control">
                </div>
            </div>
            <br />

            <!-- edit form column -->
            <div class="col-md-9 personal-info">
                <div class="alert alert-info alert-dismissable">
                    <h3>Datos de la cuenta</h3>
                    <br />
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Nombre:</label>
                            <div id="value_1" class="currentData" onclick="show_1()"><i class="fa fa-pencil-square-o" aria-hidden="true" title="Editar"></i></div>
                            <div id="edit_1" class="col-lg-8" style="display:none">
                                <input type="text" id="nombre" class="form-control" name="nombre" placeholder="Nombre" inputmode="latin-name" minlength="2" maxlength="30" ng-model="registro.nombre" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Primer apellido:</label>
                            <div id="value_2" class="currentData" onclick="show_2()"><i class="fa fa-pencil-square-o" aria-hidden="true" title="Editar"></i></div>
                            <div id="edit_2" class="col-lg-8" style="display:none">
                                <input type="text" id="apellido_1" class="form-control" name="apellido_1" placeholder="Primer apellido" inputmode="latin-name" minlength="2" maxlength="30" ng-model="registro.apellido_1" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Segundo apellido:</label>
                            <div id="value_3" class="currentData" onclick="show_3()"><i class="fa fa-pencil-square-o" aria-hidden="true" title="Editar"></i></div>
                            <div id="edit_3" class="col-lg-8" style="display:none">
                                <input type="text" id="apellido_2" class="form-control" name="apellido_2" placeholder="Segundo apellido" inputmode="latin-name" minlength="2" maxlength="30" ng-model="registro.apellido_2">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Fecha de nacimiento:</label>
                            <div id="value_4" class="currentData" onclick="show_4()"><i class="fa fa-pencil-square-o" aria-hidden="true" title="Editar"></i></div>
                            <div id="edit_4" class="col-lg-8" style="display:none">
                                <input placeholder="Fecha de nacimiento" type="text" onfocus="(this.type='date')" min="1900-01-01" max="2016-12-31" id="fecha_nacimiento" class="form-control" name="fecha_nacimiento" ng-model="registro.fecha_nacimiento" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">NIF:</label>
                            <div id="value_5" class="currentData" onclick="show_5()"><i class="fa fa-pencil-square-o" aria-hidden="true" title="Editar"></i></div>
                            <div id="edit_5" class="col-lg-8" style="display:none">
                                <input type="text" id="nif" class="form-control" name="nif" placeholder="NIF" minlength="9" maxlength="9" ng-model="registro.nif" required>      
                            </div>
                        </div>
                        <div class="form-group">
                            <label id="pass_label" class="col-md-3 control-label">Contraseña:</label>
                            <label id="newPass_label" class="col-md-3 control-label" style="display:none">Nueva contraseña:</label>
                            <div id="value_6" class="currentData" onclick="show_6()"><i class="fa fa-pencil-square-o" aria-hidden="true" title="Editar"></i></div>
                            <div id="edit_6" class="col-md-8" style="display:none">
                                <input type="password" id="password" class="form-control" name="password" placeholder="Contraseña" ng-model="registro.password" minlength="4" maxlength="30" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label id="newPass_confirm" class="col-md-3 control-label" style="display:none">Confirmar nueva contraseña:</label>
                            <div id="edit_7" class="col-md-8" style="display:none">
                                <input type="password" id="password" class="form-control" name="password" placeholder="Contraseña" ng-model="registro.password" minlength="4" maxlength="30" required>
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label class="col-md-3 control-label"></label>
                            <div class="col-md-8">
                                <input id="sub_button" type="submit" class="btn btn-primary" disabled="disabled" value="Guardar cambios" >
                                <input type="reset" class="btn btn-default" value="Cancelar" onclick="hide_all()">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>         
    
<?php include("cierre.php") ?>
        <script>
            var global_id_user = <?php echo $_SESSION['user_id']; ?>;
        </script>
        <script type="text/javascript" src="../js/editar_perfil.js"></script>
    </body>
</html>

