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
// Esto habrá que cambiarlo al integrarlo en el proyecto general (Cambiado)
answersLog.id_usuario =global_id_user;

// Añadido para recuperar preguntas al retroceder
var respuestas = [];
var num_preg = 0;

$(function() {
    
    getData("/temas", showTemas);
    
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
        num_preg--;
        
		removeAnswer();

		questionIndex -= 1;
		questionResource = "/examen/pregunta/" + questionIndex;

		$('#send').remove();
		$('#alerta').html("");
        $('#question').show();
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
		location.reload();
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
	var formContentTemas = "";	
	$.each(data, function(index, value) {		
		formContentTemas += '<option id="' + value.id_tema + '"' + 'value="' + value.id_tema + '">' + value.nombre + '</option>';
	});	
	$('#temaSelection').append(formContentTemas);
}

function showExamenes(data) {
        
    $("#exam_selector").remove();
    $("#button_exam_selector").remove();
    
	var formContentExamenes = 
    '<div id="exam_selector" class="form-group">'
		+ '<label for="examenSelection" class="col-sm-3 control-label">Seleccionar Examen: </label>' 
		+ '<div class="col-sm-9">'
			+ '<select id="examenSelection" name="examenSelection" class="form-control" required>'
				+ '<option value="">Seleccionar Examen</option>'

	var seleccionarButton = 
	'<div id="button_exam_selector" class="form-group">'
		+ '<label class="col-sm-3 control-label" for="examenSelection"></label>'
		+ '<div class="col-sm-9">'
			+ '<button id="seleccionar" class="btn btn-primary" type="submit">Seleccionar</button>'
	+ '</div></div></form>';

	$.each(data, function(index, value) {		
		formContentExamenes += '<option id="' + value.id_examen + '"'  
							+ 'value="' + value.id_examen + '">' 
							+ value.nombre + '</option>'	
	});

	formContentExamenes += '</select></div></div>';
	$('#formTemas').append(formContentExamenes + seleccionarButton);	
}

// When "Seleccionar" button is selected, show description and time limit
function selectedExam(){   
    var descriptionResource = "/examen/get/" +  idSelectedExamen;
	getData(descriptionResource, showDescription);	
}

function showDescription(data) {
	timeExam = parseInt(data.tiempo);
	msecLeft = timeExam * 60 * 1000;
	var startButton = '<button id="start" name="start" class="btn btn-primary">Empezar examen</button>';
	var descriptionHTML = '<div class="col-sm-2"></div><div class="col-sm-8" style="margin-left:auto;margin-right:auto;">'
                        + '<h3>Datos examen:</h3>'
                        + '<table class="table"><tr><td class="bold">Nombre:</td><td><span class="bg-info">' + nombreSelectedExamen + '</span></td></tr>'
                        + '<tr><td class="bold">Descripción:</td><td><span class="bg-info">' + data.descripcion + '</span></td></tr>'
                        + '<tr><td class="bold">Tiempo máximo de realización:</td><td><span class="bg-info">' + data.tiempo + ' minutos</span></td></tr>'
                        + '</table>'						
						+ startButton + '</div>';

	
	var descriptionComplete = descriptionHTML;
	$('#container').html(descriptionComplete);
}

function startTest() {    
	var newTemplate = '<div class="col-sm-2"></div><div id="detailContainer" class="col-sm-8"><div id="countdown"></div><div id="question"></div><div id="options"></div></div>';
	
    var countdownContent = '<p class="bg-info"><i class="fa fa-clock-o fa-2x" aria-hidden="true" style="color:red; margin-left: 5px;"></i> <span id="time">00:00</span> <i class="fa fa-clock-o fa-2x" aria-hidden="true" style="color:red; margin-right: 5px;"></i></p>';	    
    
	$('#container').html(newTemplate);
    $('#countdown').html(countdownContent);
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

	msecLeft -= 1000;

	var min = Math.floor(msecLeft / (60 * 1000));
	var sec = Math.floor((msecLeft - (min * 60 * 1000)) / 1000);
	
	if (msecLeft < 0) {
		clearInterval(interval);
		$('#container').empty();

		var message = '<div class="col-sm-9"><p id="alertMessage" class="text-danger">Oops! Se ha agotado el tiempo de examen. </p>';
		var volver = '<button class="volver btn btn-primary">Realizar otro examen</button></div>';
		$('#container').html(message + volver);
	} else {
		$("#time").html(min + ':'+ sec);
	}
}

function showQuestion(data) {
    
    var nextBackButtons;
     
    if(questionIndex==1){
        nextBackButtons = '<br /><button id="next" name="next" class="btn btn-primary" style="margin-left:5px">Siguiente Pregunta</button>';
    } else {
        nextBackButtons = '<br /><button id="back" name="back" class="btn btn-default">Anterior Pregunta</button>'
						+ '<button id="next" name="next" class="btn btn-primary" style="margin-left:5px">Siguiente Pregunta</button>';
    } 
    
	idPregunta = parseInt(data.id_pregunta);
    
	if (idPregunta != 0) {
        
		var enunciado = '<h3 style="margin-bottom:15px">' + data.enunciado + '</h3>';
		var opciones = '<form id="formPreguntas" action="javascript:void(0);" onsubmit="return false;">';
                
		$.each(data.respuestas, function(key, value) {
			opciones += '<div class="radio"><label><input id="' + key + '"type="radio" name="answer" value="' + key +'">' + value + '</label></div>'; 
		})

		opciones += '</form>';
		$('#question').html(enunciado);
		$('#options').html(opciones);
		$('#formPreguntas').append(nextBackButtons);
                
        if(!(typeof respuestas[num_preg] === "undefined")){
            $("#"+respuestas[num_preg]).prop( "checked", true );
        }
	} 
	else {
        $('#question').html('<h3 style="margin-bottom:15px">Fin del examen</h3>');
        $('.radio').hide();
		$('#next').hide();
		var sendButton = '<button id="send" name="send" class="btn btn-primary" style="margin-left:5px">Finalizar examen</button>';
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
        
        respuestas[num_preg] = valueAnswer;
        num_preg++;
        //alert(answersLog.respuestas[questionIndex-1].id_pregunta +''+answersLog.respuestas[questionIndex-1].respuesta)
	}
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
	var resultsHTML = '<div class="col-sm-2"></div><div id="results" class="col-sm-8">'
					+ '<h3>Tus resultados:</h3>'
                    + '<table class="table">'
					+ '<tr><td>Aprobado: </td>' + '<td><span class="bg-info">' + aprobado + '</span></td></tr>'
					+ '<tr><td>Nota: </td>' + '<td><span class="bg-info">' + result.nota.toFixed(1) + '/10</span></td></tr>'
					+ '<tr><td>Porcentaje de aciertos: </td>' + '<td><span class="bg-info"> ' + result.porcentaje_aciertos.toFixed() + '%</td></tr></table>';
					
	var volverButton = '<button class="volver btn btn-primary">Realizar otro examen</button></div>';
	$('#container').html(resultsHTML + volverButton);
}