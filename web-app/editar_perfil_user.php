<?php include("user_cabecera1.php") ?>

    <!-- Including custom style for this page -->
    <link rel="stylesheet" href="../css/editar_perfil.css">
              
<?php include("user_cabecera2.php") ?>    
    
       <h1>Editar perfil</h1>
        <hr>
        <div class="row">
            <!-- left column -->
            <div class="col-md-3">                
                    <div id="pic_container">
                        <img id="user_photo" src="../img/users/<?php echo $_SESSION['user_img'];?>" alt="User profile pic">                        
                    </div>
                    <h6 id="profile_pic_name"><?php echo $_SESSION['user_img'];?></h6>   
                    <input type="file" class="btn btn-default" name="fileToUpload" id="fileToUpload" required style="width: 100%;margin-bottom:5px;"> 
            </div>

            <!-- edit form column -->
            <div class="col-md-9 personal-info">
                <div class="alert alert-info alert-dismissable">
                    <h3>Datos de la cuenta</h3>
                    <br />                    
                    <form action="javascript:void(0);" onsubmit="update_profile(); return false" class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Nombre:</label>
                            <div id="edit_1" class="col-lg-8">
                                <input type="text" id="nombre" class="form-control" name="nombre" inputmode="latin-name" minlength="2" maxlength="30" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Primer apellido:</label>
                            <div id="edit_2" class="col-lg-8">
                                <input type="text" id="apellido_1" class="form-control" name="apellido_1" inputmode="latin-name" minlength="2" maxlength="30" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Segundo apellido:</label>
                            <div id="edit_3" class="col-lg-8">
                                <input type="text" id="apellido_2" class="form-control" name="apellido_2" inputmode="latin-name" minlength="2" maxlength="30">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Fecha de nacimiento:</label>
                            <div id="edit_4" class="col-lg-8">
                                <input type="date" min="1900-01-01" max="2016-12-31" id="fecha_nacimiento" class="form-control" name="fecha_nacimiento" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">NIF:</label>
                            <div id="edit_5" class="col-lg-8">
                                <input type="text" id="nif" class="form-control" name="nif" minlength="9" maxlength="9" required>      
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">Correo electrónico:</label>
                            <div id="edit_6" class="col-md-8">
                                <input type="email" id="login" class="form-control" name="login" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label id="oldPass" class="col-md-3 control-label">Contraseña actual:</label>
                            <div id="edit_7" class="col-md-8">
                                <input type="password" id="password_old" class="form-control" name="password_old" minlength="4" maxlength="30" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label id="newPass_label" class="col-md-3 control-label">Nueva contraseña:</label>
                            <div id="edit_8" class="col-md-8">
                                <input type="password" id="password_new" class="form-control" name="password_new" minlength="4" maxlength="30" required>
                            </div>
                        </div>                       
                        <hr>
                        <div class="form-group">
                            <label class="col-md-3 control-label"></label>
                            <div class="col-md-8">
                                <input id="sub_button" type="submit" class="btn btn-primary" value="Guardar cambios" >
                                <input type="reset" class="btn btn-default" value="Cancelar">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>         
    
    <?php include("cierre.php") ?>
    
    <script>
        function upload(){
            $.ajax
            ({
                type: "POST",
                url: "upload.php",
                success: function()
                {
                    alert("uploaded");
                }
            });
        }
    </script>
   
       <script>
            var global_id_user = <?php echo $_SESSION['user_id']; ?>;
        </script>
        <script type="text/javascript" src="../js/editar_perfil.js"></script>
    </body>
</html>