var url = '../src/public/historial/examenes/' + global_id_user;
var idDetalleExamen;
$(function () {
    getData(url, showTableExamenes);
    $('body').on("click", ".verDetalle", function () {
        idDetalleExamen = $(this).attr('id');
        getData(url, mapAnswers);
    })
    $('body').on("click", "#back", function () {
        $('#back').remove();
        getData(url, showTableExamenes);
    })
})

function getData(url, callback) {
    $.ajax({
        type: 'GET'
        , url: url
        , dataType: 'json'
        , success: function (data) {
            callback(data);
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus);
        }
    })
}

function parseData(data) {
    var parsedData = [];
    $.each(data, function (index, value) {
        var evalObj = {};
        evalObj.id_examen = value.id_examen;
        var examsToParse = value.examen_json;
        var parsedExams = JSON.parse(examsToParse);
        evalObj.examen_json = parsedExams;
        var resultsToParse = value.resultados_json;
        var parsedResults = JSON.parse(resultsToParse);
        evalObj.resultados_json = parsedResults;
        parsedData.push(evalObj);
    })
    return parsedData;
}
// Los campos Fecha, Nombre, Descripción, Apto y Nota se obtienen directamente del JSON
function showTableExamenes(data) {
    var tableCampos = ["Fecha", "Nombre", "Descripción", "Apto", "Nota", "Detalle"];
    var tableHead = '<thead><tr>'
    $.each(tableCampos, function (index, value) {
        tableHead += '<th>' + value + '</th>';
    })
    tableHead += '</thead>';
    var tableBody = '<tbody>';
    $.each(data, function (index, value) {
        var aprobado;
        if (value.apto == 1) {
            aprobado = 'SÍ';
        }
        else {
            aprobado = 'NO';
        }
        notaProcesada = parseFloat(value.nota).toFixed(1);
        tableBody += '<tr>' + '<td>' + value.fecha_hora + '</td>' + '<td>' + value.nombre + '</td>' + '<td>' + value.descripcion + '</td>' + '<td>';
        
         if (aprobado == 'SÍ') {
            tableBody += '<i style="color:green; font-size:16px;" class="fa fa-check-circle'
        }
        else {
            tableBody += '<i style="color:red; font-size:16px;" class="fa fa-times-circle'
        }
        tableBody += '" aria-hidden="true"></i></td>' + '<td>' + notaProcesada + '</td>' + '<td>' + '<a href="' + '#' + '" id="' + value.id_examen + '" class="verDetalle">Ver</a>' + '</td>';
    })
    tableBody += '</tbody>';
    var examenesTable = tableHead + tableBody;
    $('table').html(examenesTable);
}
// Para ver el detalle del examen, hay que procesar antes el JSON
function mapAnswers(data) {
    var parsedInfo = parseData(data);
    var infoDetalle = [];
    $.each(parsedInfo, function (index, value) {
        var userAns = value.resultados_json;
        if (value.id_examen == idDetalleExamen) {
            $.each(value.examen_json, function (index, value) {
                var correctObj = {};
                correctObj.id_pregunta = value.id_pregunta;
                correctObj.enunciado = value.enunciado;
                for (var i = 0; i < userAns.length; i++) {
                    if (value.id_pregunta == userAns[i].id_pregunta) {
                        correctObj.respuesta = userAns[i].respuesta;
                        correctObj.respuesta_texto = value.respuestas[userAns[i].respuesta];
                    }
                }
                correctObj.solucion = value.respuestas.solucion;
                correctObj.solucion_texto = value.respuestas[value.respuestas.solucion];
                if (correctObj.solucion == correctObj.respuesta) {
                    correctObj.correcto = 'SÍ';
                }
                else {
                    correctObj.correcto = 'NO';
                }
                infoDetalle.push(correctObj);
            })
        }
    })
    showDetalle(infoDetalle);
}

function showDetalle(objeto) {
    var tableCampos = ["# Pregunta", "Enunciado", "Opción seleccionada", "Correcto", "Solución"];
    var tableHead = '<div class="table-responsive"><table class="table table-striped"><thead><tr>'
    $.each(tableCampos, function (index, value) {
        tableHead += '<th>' + value + '</th>';
    })
    tableHead += '</thead>';
    var tableBody = '<tbody>';
    $.each(objeto, function (index, value) {
        tableBody += '<tr>' + '<td>' + value.id_pregunta + '</td>' + '<td>' + value.enunciado + '</td>' + '<td>' + value.respuesta +" : "+ value.respuesta_texto +  '</td>' + '<td> ';
        if (value.correcto == 'SÍ') {
            tableBody += '<i style="color:green; font-size:16px;" class="fa fa-check-circle'
        }
        else {
            tableBody += '<i style="color:red; font-size:16px;" class="fa fa-times-circle'
        }
        tableBody += '" aria-hidden="true"></i></td>' + '<td>' + value.solucion +" : "+ value.solucion_texto + '</td>';
    })
    tableBody += '</tbody></table></div>';
    var detallesTable = tableHead + tableBody;
    $('#container').html(detallesTable);
    var backButton = '<button id="back" value="back" class="btn btn-default">Volver a mis exámenes</button>';
    $('#container').append(backButton);
}