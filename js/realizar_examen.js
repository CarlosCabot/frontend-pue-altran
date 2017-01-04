/* ---- DECLARACIÓN DE VARIABLES ---- */

// Añadir ../ para cuando lo integremos en el proyecto general
var rootURL = '../src/public';

var idSelectedTema;
var idSelectedExamen;
var idPregunta;
var nombreSelectedExamen;

var questionIndex = 1;
var questionResource = '';

var answersLog = new Object();
// Esto habrá que cambiarlo al integrarlo en el proyecto general
answersLog.id_usuario = 1;

/* ---- CUANDO ESTÉ LISTO EL DOM, HAZ ESTO ---- */
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

	// When examen is selected, show "Seleccionar" button
	$('body').on('change', '#examenSelection', function() {
		var $selectedExamen = $('#examenSelection option:selected');
		idSelectedExamen = parseInt($selectedExamen.val());
		nombreSelectedExamen = $selectedExamen.html();
		answersLog.id_examen = idSelectedExamen;

		if (idSelectedExamen!= '') {
			seleccionarButton = '<button id="seleccionar">Seleccionar</button>';
			$('#container').append(seleccionarButton);
		} else {
			$('#seleccionar').remove();
		}
	});

	// When "Seleccionar" button is selected, show description and time limit
	$('body').on('click', '#seleccionar', function() {
		var descriptionResource = "/examen/get/" +  idSelectedExamen;
		getData(descriptionResource, showDescription);
	});

	// When "Empezar" button is selected, start test
	$('body').on('click', '#start', function() {
		startTest();
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
			var alerta = '<em id="alerta"> Por favor, selecciona una respuesta.</em>';
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
	var formContentTemas = '<select id="temaSelection" name="temaSelection"><option value="">Seleccionar Tema</option>';
	$.each(data, function(index, value) {		
		formContentTemas += '<option id="' + value.id_tema + '"' + 'value="' + value.id_tema + '">' + value.nombre + '</option>';
	});
	formContentTemas += '</select>';
	$('#container').html(formContentTemas);
	return;
}

function showExamenes(data) {
	var formContentExamenes = '<select id="examenSelection" name="examenSelection"><option value="">Seleccionar Examen</option>';
	$.each(data, function(index, value) {		
		formContentExamenes += '<option id="' + value.id_examen + '"'  
							+ 'value="' + value.id_examen + '">' 
							+ value.nombre + '</option>'	
	});
	formContentExamenes += '</select><br />';
	$('#container').html(formContentExamenes);	
	return;
}

function showDescription(data) {
	var descriptionHTML = '<div>'
						+ '<p id="title">Título del examen: ' + nombreSelectedExamen + '</p>'
						+ '<p id="description">Descripción: ' + data.descripcion + '</p>'
						+ '<p id="time">Tiempo máximo para realizar el examen: ' + data.tiempo + ' minutos</p>'
						+ '</div>';

	var startButton = '<button id="start" name="start">Empezar</button>';

	var descriptionComplete = descriptionHTML + startButton;
	$('#container').html(descriptionComplete);
	return;
}

function startTest() {
    
	var newTemplate = '<div id="question"></div><div id="options"></div>';
	var nextBackButtons = '<br /><button id="back" name="back">Anterior</button>'
						+ '<button id="next" name="next">Siguiente</button>';

	$('#container').html(newTemplate + nextBackButtons);
	$('#container').append('<em id="alerta"></em>');
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
	return;
}

function showQuestion(data, questionIndex) {
	idPregunta = parseInt(data.id_pregunta);

	if (idPregunta != 0) {
		var enunciado = '<p>' + data.enunciado + '</p></div>';
		var opciones = '<form id="optionsForm">';
		$.each(data.respuestas, function(key, value) {
			opciones += '<input type="radio" name="answer" value="' + key +'">' + value + '<br />'; 
		})
		opciones += '</form></div>';
		$('#question').html(enunciado);
		$('#options').html(opciones);
	} 
	else {
		$('#next').hide();
		var sendButton = '<button id="send" name="send">Enviar respuestas</button>';
		$('body').append(sendButton);
	}
	return;
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
	return;
}

function removeAnswer() {
	answersLog.respuestas.pop();
}

function sendAnswers(datosAnswers) {
	$.ajax({
		type: "POST",
		url:  rootURL + "/examen/finalize",
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
	var resultsHTML = '<div id="results">'
					+ '<p>Aprobado: ' + aprobado + '</p>'
					+ '<p>Tu nota: ' + result.nota + '/10</p>'
					+ '<p>Tu porcentaje de aciertos:' + result.porcentaje_aciertos + '%</p>'
					+ '</div>';
	$('body').html(resultsHTML);
}
