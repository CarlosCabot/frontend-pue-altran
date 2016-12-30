/* Cuando la API tenga listo el método para enviar un objeto JSON con la información:
	- id_evaluación
	- fecha_hora
	- id_examen
	- nombre
	- descripcion
	- resultados_json
	- examen_json
	- apto
	- nota

habrá que:
	- Eliminar la variable 'info'
	- Eliminar las 3 líneas que usan la variable 'info' (52, 58, 68)
	- Asignar valor a la variable "resource" (línea 20), que será la ruta (ej: /examenes/all)
	- Descomentar las 3 líneas comentadas (53, 59, 68)
*/

var rootURL = '../src/public';
var resource = '';
var idUsuario = 1;
var idDetalleExamen;

var info =  [
	{
 		"id_evaluacion": 1,
 		"fecha_hora": "2016-04-20 12:56:03",
		"id_examen": 1,
		"nombre": "CSS",
		"descripcion": "Descripción examen CSS",
		"resultados_json": [{"id_pregunta":1,"respuesta":"B"},{"id_pregunta":2,"respuesta":"B"},{"id_pregunta":3,"respuesta":"B"},{"id_pregunta":4,"respuesta":"B"},{"id_pregunta":5,"respuesta":"B"}],
		"examen_json": [{"id_pregunta":1,"enunciado":"¿Como se denomina el lenguaje de estilos para navegador?","respuestas":{"A":"CSS","B":"HTML","C":"Javascript","D":"XML","solucion":"A"}},{"id_pregunta":2,"enunciado":"¿Como definiriamos el software Brackets?","respuestas":{"A":"como un IDE","B":"como un editor de texto","C":"como lenguaje de programación","D":"como aparatos","solucion":"B"}},{"id_pregunta":3,"enunciado":"¿Donde se ejecuta el lenguaje PHP?","respuestas":{"A":"En le navegador","B":"En mi casa","C":"En el servidor de aplicaciones php","D":"En ninguna de las anteriores","solucion":"C"}},{"id_pregunta":4,"enunciado":"¿Las siglas HTML son de?","respuestas":{"A":"Lenguaje de Programación de Hipertexto","B":"Lenguaje de Marcas de Ropa","C":"HyperText Markdown Language","D":"Lenguaje de Marcas de Hipertexto","solucion":"D"}},{"id_pregunta":5,"enunciado":"¿Finalizaremos el proyecto a tiempo?","respuestas":{"A":"Puede","B":"No","C":"Hombre claro","D":"¿Que proyecto?","solucion":"C"}}],
 		"apto": 0,
 		"nota": 8
 	},
 	{
 		"id_evaluacion": 2,
 		"fecha_hora": "2016-05-02 18:50:53",
		"id_examen": 3,
		"nombre": "Historia",
		"descripcion": "Descripción examen Historia",
		"resultados_json": [{"id_pregunta":1,"respuesta":"C"},{"id_pregunta":2,"respuesta":"C"},{"id_pregunta":3,"respuesta":"C"},{"id_pregunta":4,"respuesta":"C"},{"id_pregunta":5,"respuesta":"C"}, {"id_pregunta":6,"respuesta":"D"}],
		"examen_json": [{"id_pregunta":1,"enunciado":"Uno de los principios más importantes de la Reforma predicada por Martín Lutero fue:","respuestas":{"A":"La eliminación de la práctica religiosa.","B":"El rechazo de la veneración de los santos.","C":"La reducción de los sacramentos.","D":"El reconocimiento de la Biblia como única fuente de la verdad religiosa.","solucion":"D"}},{"id_pregunta":2,"enunciado":"Navegando por el Canal de Beagle, ¿cuál será el medio técnico de orientación más preciso?","respuestas":{"A":"La observación de las estrellas.","B":"La inclinación de los árboles.","C":"El empleo de la brújula.","D":"La posición del sol.","solucion":"C"}},{"id_pregunta":3,"enunciado":"Los espacios verdes en una ciudad contribuyen al estado sanitario de la misma. ¿Cuál de las siguientes expresiones sintetiza mejor su importancia para la salud pública?","respuestas":{"A":"El verde de la vegetación es un descanso para la vista.","B":"Los parques son los pulmones de la ciudad.","C":"Los árboles hacen más agradable la temperatura.","D":"El contacto con la vegetación ayuda a relajarse.","solucion":"B"}},{"id_pregunta":4,"enunciado":"Los espartanos se caracterizaron principalmente:","respuestas":{"A":"Por su espíritu guerrero.","B":"Porque las mujeres recibían educación física.","C":"Porque disponían de un gran número de ilotas.","D":"Por haber creado la institución de los éforos.","solucion":"A"}},{"id_pregunta":5,"enunciado":"¿Cuál de los siguientes edificios es más alto?","respuestas":{"A":"Empire State Building","B":"New World Trade Center","C":"Torre Agbar","D":"Burj Khalifa","solucion":"D"}},{"id_pregunta":6,"enunciado":"¿Cuál de los siguientes autores es literato español?  ","respuestas":{"A":"Los hermanos Álvarez Quintero.","B":"Mariano de Vedia y Mitre.","C":"Victoria Ocampo.","D":"Rómulo Gallegos.","solucion":"A"}}],
 		"apto": 0,
 		"nota": 6
 	}
 ]

$(function() {

	$('body').on("click", "#myExamenes", function() {
		showTableExamenes(info);
		// getData(resource, showTableExamenes);
	})

	$('body').on("click", ".verDetalle", function() {
		idDetalleExamen = $(this).attr('id');
		mapAnswers(info);
		// getData(resource, mapAnswers);
		
		var backButton = '<button id="back" value="back">Volver a mis exámenes</button>';
		$('#container').append(backButton);
	})

	$('body').on("click", "#back", function() {
		$('#back').remove();
		showTableExamenes(info);
		// getData(resource, showTableExamenes);
	})

})

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

function showTableExamenes(data) {
	var tableCampos = ["Fecha", "Nombre", "Descripción", "Apto", "Nota", "Detalle"];
	
	var tableHead = '<thead><tr>'
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

		tableBody += '<tr>'
				+ '<td>' + value.fecha_hora + '</td>'
				+ '<td>' + value.nombre + '</td>'
				+ '<td>' + value.descripcion + '</td>'
				+ '<td>' + aprobado + '</td>'
				+ '<td>' + value.nota + '</td>'
				+ '<td>' + '<a href="' + '#' +  '" id="' + value.id_examen  
				+ '" class="verDetalle">Ver</a>' + '</td>';
	})
	tableBody += '</tbody>';

	var examenesTable = tableHead + tableBody;
	$('#container').html(examenesTable);
}

function mapAnswers(data) {
	var infoDetalle = [];

	$.each(data, function(index, value) {
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

	var tableHead = '<thead><tr>'
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
	tableBody += '</tbody>';

	var detallesTable = tableHead + tableBody;
	$('#container').html(detallesTable);
}


