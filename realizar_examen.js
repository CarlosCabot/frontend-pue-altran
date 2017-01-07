var rootURL = '../src/public';

var idSelectedTema;
var idSelectedExamen;
var idPregunta;
var nombreSelectedExamen;

var timeExam;
var msecLeft;
var interval;

var questionIndex = 1;
var questionResource = '';

var answersLog = new Object();
// Esto habrá que cambiarlo al integrarlo en el proyecto general
answersLog.id_usuario = 1;


$(function() {

	// When button is clicked, show available temas
	$('body').on('click', '#mainStart', function() {
		getData("/temas", showTemas);
	});

	// When tema is selected, show examenes of selected tema
	$('body').on('change', '#temaSelection', function() {
		var $selectedTema = $('#temaSelection option:selected');
		idSelectedTema = $selectedTema.val();

		if (idSelectedTema != '') {
			var examenesResource = "/examenes/" + idSelectedTema;
			getData(examenesResource, showExamenes);
		} 
	});

	// Get the id of the selected exam
	$('body').on('change', '#examenSelection', function() {
		var $selectedExamen = $('#examenSelection option:selected');
		idSelectedExamen = parseInt($selectedExamen.val());
		nombreSelectedExamen = $selectedExamen.html();
		answersLog.id_examen = idSelectedExamen;
	});

	// When "Seleccionar" button is selected, show description and time limit
	$('body').on('click', '#seleccionar', function() {
		if (idSelectedExamen != undefined) {
			var descriptionResource = "/examen/get/" +  idSelectedExamen;
			getData(descriptionResource, showDescription);
		}
	});

	// When "Empezar" button is selected, start test
	$('body').on('click', '#start', function() {
		startTest();
		interval = setInterval(timer, 1000);
	});

	// When "next" button is pressed, next question is showed
	$('body').on('click', '#next', function() {
		if ($('input[name="answer"]').is(':checked')) { 
			$("#alerta").html("");

			questionIndex += 1;
			questionResource = "/examen/pregunta/" + questionIndex;

			$('#back').show();
		
			getData(questionResource, showQuestion);
			addAnswer(questionIndex-1);
		} else {
			var alerta = '<em id="alerta" class="text-warning"> Por favor, selecciona una respuesta.</em>';
			$('#alerta').html(alerta);
		}
	});

	$('body').on('click', '#back', function() {
		removeAnswer();

		questionIndex -= 1;
		questionResource = "/examen/pregunta/" + questionIndex;

		$('#send').remove();
		$('#alerta').html("");
		$('#next').show();
		
		if (questionIndex == 1) {
			$('#back').hide(); 
		}
		getData(questionResource, showQuestion);
	});

	$('body').on('click', '#send', function() {
		addAnswer(questionIndex); 
		sendAnswers(answersLog);
	});

	$('body').on('click', '.volver', function() {
		var startTemplate = '<div id="container"><button id="mainStart" class="btn btn-primary">Quiero examinarme</button></div>';
		$('body').html(startTemplate);
	});
})

/* ---- DEFINICIÓN DE FUNCIONES ---- */
function getData(resource, callback) {
	$.ajax({
		type: 'GET',
		url: rootURL + resource,
		dataType: 'json',
		success: function(data) {
			callback(data); 
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert(textStatus); 
		}
	})
}

function showTemas(data) {
	var formContentTemas = 
	'<form id="formTemas" action="javascript:void(0);" class="form-horizontal" onsubmit="return false;">'
		+ '<div class="form-group">' 
			+ '<label for="temaSelection" class="col-sm-3 control-label">Seleccionar Tema: </label>'
			+ '<div class="col-sm-9">'
				+ '<select id="temaSelection" name="temaSelection" class="form-control">'
					+ '<option value="">Seleccionar Tema</option>';

	$.each(data, function(index, value) {		
		formContentTemas += '<option id="' + value.id_tema + '"' + 'value="' + value.id_tema + '">' + value.nombre + '</option>';
	});

	formContentTemas += '</select></div></div></form>';
	$('#container').html(formContentTemas);
}

function showExamenes(data) {
	var formContentExamenes = 
	'<form id="formExamenes" action="javascript:void(0);" class="form-horizontal" onsubmit="return false;">'
	+ '<div class="form-group">'
		+ '<label for="examenSelection" class="col-sm-3 control-label">Seleccionar Examen: </label>' 
		+ '<div class="col-sm-9">'
			+ '<select id="examenSelection" name="examenSelection" class="form-control" required>'
				+ '<option value="">Seleccionar Examen</option>'

	var seleccionarButton = 
	'<div class="form-group">'
		+ '<label class="col-sm-3 control-label" for="examenSelection"></label>'
		+ '<div class="col-sm-9">'
			+ '<button id="seleccionar" class="btn btn-primary">Seleccionar</button>'
	+ '</div></div></form>';

	$.each(data, function(index, value) {		
		formContentExamenes += '<option id="' + value.id_examen + '"'  
							+ 'value="' + value.id_examen + '">' 
							+ value.nombre + '</option>'	
	});

	formContentExamenes += '</select></div></div>';
	$('#container').html(formContentExamenes + seleccionarButton);	
}

function showDescription(data) {
	timeExam = parseInt(data.tiempo);
	msecLeft = timeExam * 60 * 1000;
	var startButton = '<button id="start" name="start" class="btn btn-primary">Empezar</button>';
	var descriptionHTML = '<div class="col-sm-9">'
						+ '<p id="title">Título del examen: ' + '<span class="bg-info">' + nombreSelectedExamen + '</span></p>'
						+ '<p id="description">Descripción: ' + '<span class="bg-info">' + data.descripcion + '</span></p>'
						+ '<p id="time">Tiempo máximo para realizar el examen: ' + '<span class="bg-info">' + data.tiempo + ' minutos</span></p>'
						+ startButton + '</div>';

	
	var descriptionComplete = descriptionHTML;
	$('body').html(descriptionComplete);
}

function startTest() {
	var newTemplate = '<div id="detailContainer" class="col-sm-9"><div id="countdown"></div><div id="question"></div><div id="options"></div></div>';
	
	$('body').html(newTemplate);
	$('#detailContainer').append('<em id="alerta"></em>');
	$('#back').hide();

	var startQuestionResource = "/examen/pregunta/1";
	getData(startQuestionResource, showQuestion);

	var dateStart = new Date();
	var currDate = dateStart.getDate();
	var currMonth = dateStart.getMonth() + 1;
	var currYear = dateStart.getFullYear();
	var currHour = dateStart.getHours();
	var currMin = dateStart.getMinutes();
	var currSec = dateStart.getSeconds();
	var dateFormatted = currYear + '-' + currMonth + '-' + currDate + ' ' +
					currHour + ':' + currMin + ':' + currSec;

	answersLog.fecha_hora = dateFormatted;
	answersLog.respuestas = [];
}

function timer() {
	var countdownContent = '<p class="bg-info">Tiempo restante: <span id="time"></span></p>';
	$('#countdown').html(countdownContent);

	msecLeft -= 1000;

	var min = Math.floor(msecLeft / (60 * 1000));
	var sec = Math.floor((msecLeft - (min * 60 * 1000)) / 1000);
	
	if (msecLeft < 0) {
		clearInterval(interval);
		$('body').empty();

		var message = '<div class="col-sm-9"><p id="alertMessage" class="text-danger">Oops! Se ha agotado el tiempo de examen. </p>';
		var volver = '<button class="volver" class="btn btn-default">Volver al inicio</button></div>';
		$('body').html(message + volver);
	} else {
		$("#time").html(min + ' minutos y ' + sec + ' segundos.');
	}
}

function showQuestion(data, questionIndex) {
	var nextBackButtons = '<br /><button id="back" name="back" class="btn btn-default">Anterior</button>'
						+ '<button id="next" name="next" class="btn btn-default">Siguiente</button>';

	idPregunta = parseInt(data.id_pregunta);

	if (idPregunta != 0) {
		var enunciado = '<h4>' + data.enunciado + '</h4>';
		var opciones = '<form id="formPreguntas" action="javascript:void(0);" onsubmit="return false;">';

		$.each(data.respuestas, function(key, value) {
			opciones += '<input type="radio" name="answer" value="' + key +'">' + value + '<br/>'; 
		})

		opciones += '</form>';
		$('#question').html(enunciado);
		$('#options').html(opciones);
		$('#formPreguntas').append(nextBackButtons);
	} 
	else {
		$('#next').hide();
		var sendButton = '<button id="send" name="send" class="btn btn-primary">Enviar respuestas</button>';
		$('#formPreguntas').append(sendButton);
	}
}

function addAnswer(questionIndex) {
	if (idPregunta != 0) {
		var checkedAnswer = $('input[type=radio]:checked');
		var valueAnswer = checkedAnswer.val();
		var objAnswer = {
			id_pregunta: idPregunta,
			respuesta: valueAnswer
		}
		answersLog.respuestas.push(objAnswer);
	}
}

function removeAnswer() {
	answersLog.respuestas.pop();
}

function sendAnswers(datosAnswers) {

	$.ajax({
		type: "POST",
		url:  "src/public/examen/finalize",
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(datosAnswers),
		success: function(result) {
        	showResults(result);
    	},
    	error: function(jqXHR, textStatus, errorThrown) {
    		console.log(textStatus);
    	}
	});
}

function showResults(result) {
	var aprobado;

	if (result.aprobado == 0) {
		aprobado = "NO";
	} else {
		aprobado = "SÍ";
	}
	var resultsHTML = '<div id="results" class="col-sm-9">'
					+ '<h4>Tus resultados:</h4>'
					+ '<p>Aprobado: ' + '<span class="bg-info">' + aprobado + '</span></p>'
					+ '<p>Nota: ' + '<span class="bg-info">' + result.nota.toFixed(1) + '/10</span></p>'
					+ '<p>Porcentaje de aciertos:' + '<span class="bg-info"> ' + result.porcentaje_aciertos.toFixed() + '%</p>';
					
	var volverButton = '<button class="volver" class="btn btn-default">Volver al inicio</button></div>';
	$('body').html(resultsHTML + volverButton);
}
