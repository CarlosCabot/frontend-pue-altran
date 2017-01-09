var rootURL = '../src/public';

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
    $("#login").val(array_user.nif);
    
}


function modificar_datos (){
    $.ajax({
        url: rootURL + '/user/update'
        , method: 'POST'
        , data: $("form").serialize()
        , dataType: 'json'
        , success: function () {
            if (result.status == "success") {
                
            }
            else {
                // Api error
                alert("Unexpected error from api");
            }
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
};

function show_1() {
    document.getElementById('value_1').style.display = 'none';
    document.getElementById('edit_1').style.display = 'block';
    document.getElementById('sub_button').disabled = false;
}
function show_2() {
    document.getElementById('value_2').style.display = 'none';
    document.getElementById('edit_2').style.display = 'block';
    document.getElementById('sub_button').disabled = false;
}
function show_3() {
    document.getElementById('value_3').style.display = 'none';
    document.getElementById('edit_3').style.display = 'block';
    document.getElementById('sub_button').disabled = false;
}
function show_4() {
    document.getElementById('value_4').style.display = 'none';
    document.getElementById('edit_4').style.display = 'block';
    document.getElementById('sub_button').disabled = false;
}
function show_5() {
    document.getElementById('value_5').style.display = 'none';
    document.getElementById('edit_5').style.display = 'block';
    document.getElementById('sub_button').disabled = false;
}
function show_6() {
    document.getElementById('pass_label').style.display = 'none';
    document.getElementById('newPass_label').style.display = 'block';
    document.getElementById('value_6').style.display = 'none';
    document.getElementById('edit_6').style.display = 'block';
    document.getElementById('newPass_confirm').style.display = 'block';
    document.getElementById('edit_7').style.display = 'block';
    document.getElementById('sub_button').disabled = false;
}
function hide_all() {
    document.getElementById('edit_1').style.display = 'none';
    document.getElementById('value_1').style.display = 'block';
    document.getElementById('edit_2').style.display = 'none';
    document.getElementById('value_2').style.display = 'block';
    document.getElementById('edit_3').style.display = 'none';
    document.getElementById('value_3').style.display = 'block';
    document.getElementById('edit_4').style.display = 'none';
    document.getElementById('value_4').style.display = 'block';
    document.getElementById('edit_5').style.display = 'none';
    document.getElementById('value_5').style.display = 'block';
    document.getElementById('newPass_label').style.display = 'none';
    document.getElementById('pass_label').style.display = 'block';
    document.getElementById('edit_6').style.display = 'none';
    document.getElementById('value_6').style.display = 'block';
    document.getElementById('edit_7').style.display = 'none';
    document.getElementById('newPass_confirm').style.display = 'none';
    document.getElementById('sub_button').disabled = true;
}