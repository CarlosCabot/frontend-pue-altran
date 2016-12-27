$(document).ready(function () {
    $.ajax({
        url: 'src/public/examen/finalize'
        , type: 'post'        
        , dataType: "json"
        , success: function (){}
        , data: { id_usuario: 1, id_examen: 1, fecha_hora: "2016-12-19 23:59:23", respuestas: [{id_pregunta:2, respuesta:"A"},{id_pregunta:1,respuesta:"A"}]}
    });
});