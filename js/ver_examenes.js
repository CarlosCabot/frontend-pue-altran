var idUsuario = 1;
var url = '../src/public/historial/examenes/7';
var idDetalleExamen;

$(function() {

	$('body').on("click", "#myExamenes", function() {
		getData(url, showTableExamenes);
	})

	$('body').on("click", ".verDetalle", function() {
		idDetalleExamen = $(this).attr('id');
		getData(url, mapAnswers);
	})

	$('body').on("click", "#back", function() {
		$('#back').remove();
		getData(url, showTableExamenes);
	})

	$('body').on("click", "#backInicio", function() {
		$('#container').html('<button id="myExamenes" class="btn btn-primary">Ver mis exámenes</button>');
	})

})

function getData(url, callback) {
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'json',
		success: function(data) {
			callback(data);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert(textStatus); 
		}
	})
}

function parseData(data) {
	var parsedData = [];

	$.each(data, function(index, value) {
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
	
	var tableHead = '<div class="table-responsive"><table class="table table-hover"><thead><tr>'
	$.each(tableCampos, function(index, value){
		tableHead += '<th>' + value + '</th>'; 
	})
	tableHead += '</thead>';

	var tableBody = '<tbody>';
	$.each(data, function(index, value) {
		var aprobado;
		if (value.apto == 1) {
			aprobado = 'SÍ';
		} else {
			aprobado = 'NO';
		}

		notaProcesada = parseFloat(value.nota).toFixed(1);
		tableBody += '<tr>'
				+ '<td>' + value.fecha_hora + '</td>'
				+ '<td>' + value.nombre + '</td>'
				+ '<td>' + value.descripcion + '</td>'
				+ '<td>' + aprobado + '</td>'
				+ '<td>' + notaProcesada + '</td>'
				+ '<td>' + '<a href="' + '#' +  '" id="' + value.id_examen  
				+ '" class="verDetalle">Ver</a>' + '</td>';
	})
	tableBody += '</tbody></table></div>';

	var examenesTable = tableHead + tableBody;
	$('#container').html(examenesTable);

	var backInicioButton = '<button id="backInicio" class="btn btn-default" value="backInicio">Volver al inicio</button>';
	$('#container').append(backInicioButton);
}

// Para ver el detalle del examen, hay que procesar antes el JSON
function mapAnswers(data) {
	var parsedInfo = parseData(data);
	var infoDetalle = [];

	$.each(parsedInfo, function(index, value) {
		var userAns = value.resultados_json;

		if (value.id_examen == idDetalleExamen) {
			$.each(value.examen_json, function(index, value) {
				var correctObj = {};
				correctObj.id_pregunta = value.id_pregunta;
				correctObj.enunciado = value.enunciado;
				correctObj.respuesta = userAns[index].respuesta;
				correctObj.solucion = value.respuestas.solucion;

				if (value.respuestas.solucion == userAns[index].respuesta) {
					correctObj.correcto = 'SÍ';
				} else {
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
	$.each(tableCampos, function(index, value){
		tableHead += '<th>' + value + '</th>'; 
	})
	tableHead += '</thead>';

	var tableBody = '<tbody>';
	$.each(objeto, function(index, value) {
		tableBody += '<tr>'
				+ '<td>' + value.id_pregunta + '</td>'
				+ '<td>' + value.enunciado + '</td>'
				+ '<td>' + value.respuesta + '</td>'
				+ '<td>' + value.correcto + '</td>'
				+ '<td>' + value.solucion + '</td>';
	})
	tableBody += '</tbody></table></div>';

	var detallesTable = tableHead + tableBody;
	$('#container').html(detallesTable);

	var backButton = '<button id="back" value="back" class="btn btn-default">Volver a mis exámenes</button>';
	$('#container').append(backButton);

	var backInicioButton = '<button id="backInicio" class="btn btn-default" value="backInicio">Volver al inicio</button>';
	$('#container').append(backInicioButton);
}


