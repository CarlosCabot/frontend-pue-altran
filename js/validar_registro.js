var app = angular.module("app", []);
        app.controller("formulario_registro", function ($scope) {
            $scope.registro = {
                nif: '',
                login: ''
            }
        });


        $('#crear_cuenta').click(function () {
            $.ajax({
                url: 'http://localhost/frontend-pue-altran/src/public/index.php/user/new',
                method: 'POST',
                data: $("form").serialize(),
                dataType: 'json',
                success: function (result) {
                    $('#mensaje_error1').text(result.descripcion);
                    $('#mensaje_error2').text(result.descripcion);
                    $('#mensaje_exito').text(result.descripcion);
                    if (result.status == "success")
                        $('#mensaje_exito');
                    else
                        if (result.status == "error1")
                            $('#mensaje_error1');
                        else if (result.status == "error2")
                            $('#mensaje_error2');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus);
                }
            });
        });