var rootURL = 'src/public';

function login_usuario() {
    return $.ajax({
        url: rootURL + '/user/login'
        , method: 'GET'
        , data: $("form").serialize()
        , dataType: 'json'
        , success: function (result) {
            if (result.status == "success") {
                $('#error_login').css("display", "none");
                window.location.replace("web-app/inicio.html");
            }
            else if (result.status == "error") {
                $('#mensaje_error').text(result.data);
                $('#error_login').css("display", "inherit");
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



