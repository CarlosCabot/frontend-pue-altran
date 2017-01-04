var rootURL = '../src/public';

var app = angular.module("app", []);

app.controller("formulario_registro", function ($scope) {
    $scope.registro = {
        nombre: ''
        , apellido_1: ''
        , apellido_1: ''
        , fecha_nacimiento: ''
        , nif: ''
        , login: ''
        , password: ''
    }
});

function crear_cuenta (){
    $.ajax({
        url: rootURL + '/user/new'
        , method: 'POST'
        , data: $("form").serialize()
        , dataType: 'json'
        , success: function (result) {
            if (result.status == "success") {
                $('#error_registro').css("display", "none");
            }
            else if (result.status == "error") {
                $('#mensaje_error').text(result.data);
                $('#error_registro').css("display", "inherit");
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
}