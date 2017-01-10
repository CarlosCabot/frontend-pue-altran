var rootURL = '../src/public';

var profile_pic_name = '';

var newData = {
    nombre: ""
    , apellido_1: ""
    , apellido_2: ""
    , fecha_nacimiento: ""
    , nif: ""
    , login: ""
    , password_old: ""
    , password_new: ""
    , profile_img: ""
}

$(function () {
    $.ajax({
        url: rootURL + '/user/edit/' + global_id_user
        , method: 'GET'
        , dataType: 'json'
        , success: function (response) {
            var array_user = response;
            cargaUser(array_user);
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
});

function cargaUser(array_user) {
    
    $("#nombre").val(array_user.nombre);
    $("#apellido_1").val(array_user.apellido_1);
    $("#apellido_2").val(array_user.apellido_2);
    $("#fecha_nacimiento").val(array_user.fecha_nacimiento);
    $("#nif").val(array_user.nif);
    $("#login").val(array_user.login);
    $("#profile_pic_name").text(array_user.img_perfil);
    profile_pic_name = array_user.img_perfil;
    
}

function update_profile() {
    
    userUpdate();
    
    $.ajax({
        url: rootURL + '/user/update'
        , method: 'POST'
        , dataType: 'json'
        , data: {
            id_usuario: global_id_user
            , nombre: newData.nombre
            , apellido_1: newData.apellido_1
            , apellido_2: newData.apellido_2
            , fecha_nacimiento: newData.fecha_nacimiento
            , nif: newData.nif
            , login: newData.login
            , password_old: newData.password_old
            , password_new: newData.password_new
            , profile_img: newData.profile_img
        }
        , success: function (data, textStatus, jqXHR) {
            if(data.status == "error"){
                alert(data.data);                
            }else{
                alert("¡Perfil de usuario actualizado!");
                location.reload();
            }                        
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
    
}

// Almacenar los nuevos datos de usuario en la variable
function userUpdate() {
    newData.nombre = $('#nombre').val();
    newData.apellido_1 = $('#apellido_1').val();
    newData.apellido_2 = $('#apellido_2').val();
    newData.fecha_nacimiento = $('#fecha_nacimiento').val();
    newData.nif = $('#nif').val();
    newData.login = $('#login').val();
    newData.password_old = $('#password_old').val();
    newData.password_new = $('#password_new').val();
    if($('#fileToUpload').val() === ''){
        newData.profile_img = profile_pic_name;
    }else{        
        var obtain_profile = $('#fileToUpload').val(); 
        var array = obtain_profile.split('\\');  
        newData.profile_img = array[2];
    }
    
};