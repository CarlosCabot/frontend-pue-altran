// Scriptt
var rootURL = "../src/public";
var formContentExamenes;
var examen;
var idExamen;

$(function () {
    // Obtener todos los temas disponibles, cargarlos en un selector
    // Cargar por defecto los exámenes disponibles en el tema 1
    $('#botones').hide();
    $.ajax({
        type: 'GET', 
        url: rootURL + '/temas',
        dataType: "json", 
        success: function (response) {
            var array_temas = response;
			cargaTema(array_temas);
			cargaExamenes(1);
        }, 
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
    // Manejador de eventos para refrescar examenes cuando
    // el usuario cambia el tema
    $('body').on('change', '#tema', function() {
        formContentExamenes = '';
        $('#examen').remove();
        var idTema = $(this).val();                
        cargaExamenes(idTema);
    });
    // Manejador de eventos para mostrar el exámen cuando
    // el usuario ha seleccionado uno en concréto
    $('body').on('change', '#examen', function() {
        $('#metaInfoExamen').empty();
        $('#contenidoExamen').empty();
        idExamen = $(this).val();                
        cargaFormulario(idExamen);
    });
    // Manejador de eventos para el botón "Guardar cambios"
    $('#guardar_examen').on('click', function() {
        guardar(JSON.parse(examen.examen_json));
    });
    // Manejador de evento para el botón "Descartar cambios"
    $('#descartar').on('click', function() {
        descartar();
    });

// fin de la función principal   
});	

// *** Funciones para seleccionar tema y examen ***
// Carga el select #tema con los temas disponibles
function cargaTema(array_temas) {	
        var formContentTemas = '<select id="tema">';
        $.each(array_temas, function (index, value) {
            formContentTemas += '<option value="' + value.id_tema + '">' + value.nombre + '</option>';
        });
        formContentTemas += '</select>';
		$('#selector').append(formContentTemas);
}
// Carga el select #examen con los examenes del tema elegido
function cargaExamenes(idT){
    $.ajax({
        type: 'GET', 
        url: rootURL + '/examenes/' + idT, 
        dataType: "json", 
        success: function (response) {
            var array_examenes = response;
            formContentExamenes = '<select id="examen"><option value="0">Selecciona...</option>';
			$.each(array_examenes, function (index, value) {
                formContentExamenes += '<option id="' + value.id_examen + '"' + ' value="' + value.id_examen + '">' + value.nombre + '</option>';
            });
            formContentExamenes += '</select>'
            $('#selector').append(formContentExamenes);
        }, 
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}
// Llamada ajax para obtener el examen a editar
function cargaFormulario(idE){
    $.ajax({
        type: 'GET', 
        url: rootURL + '/examen/edition/' + idE, 
        dataType: "json", 
        success: function (response) {
            examen = response;
            metaInfoExamen(examen);
            contenidoExamen(examen.examen_json);
        }, 
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
}
// *** Funciones para editar el examen elegido ***
//  Rellena el formulario con los datos del examen para poder
//  editar el nombre, porcentaje de aprobado, tiempo y descripción
function metaInfoExamen(examen) {
    var metaInfoHTML = 'nombreExamen <input type="text" id="nombreExamen" name="nombreExamen" value=""/>porcentaje <input type="number" id="porcentaje" name="porcentaje" value=""/>tiempo <input type="number" id="tiempo" name="tiempo" value=""/>descripcion <textarea id="descripcion" rows="4" cols="50"> </textarea>';
    $('#metaInfoExamen').append(metaInfoHTML);
    $('#nombreExamen').val(examen.nombre);
    $('#porcentaje').val(examen.porcentaje_aprobar);
    $('#tiempo').val(examen.tiempo_minutos);
    $('#descripcion').val(examen.descripcion);

}
//  Rellena el formulario con el contenido del examen para poder
//  editar los enunciados, las respuestas y soluciones
function contenidoExamen(preguntas) {
    preguntas = JSON.parse(preguntas);
    var contenidoExamen ='<p>Exámen</p>';
    $.each(preguntas, function(key, value){
        contenidoExamen += 'Enunciado<br> <input type="text" id="enunciado'+value.id_pregunta+'" name="enunciado" value="' + value.enunciado + '"><br><input type="text" id="respuesta_A'+value.id_pregunta+'" name="respuesta_A" value="' + value.respuestas.A +'"><br><input type="text" id="respuesta_B'+value.id_pregunta+'" name="respuesta_B" value="' + value.respuestas.B +'"><br><input type="text" id="respuesta_C'+value.id_pregunta+'" name="respuesta_C" value="' + value.respuestas.C +'"><br><input type="text" id="respuesta_D'+value.id_pregunta+'" name="respuesta_D" value="' + value.respuestas.D +'"><br>';
        
        // console.log("key" + key + "value" + value);
        // console.log("ID PREGUNTA: "+value.id_pregunta);
        // console.log("SOLUCION: "+value.respuestas.solucion);
        var respuesta = "A";
        if (value.respuestas.solucion == respuesta){ var solucion = " checked='checked'";} else {var solucion =""};
        contenidoExamen += '<input class="solucion" type="radio" name="solucion'+value.id_pregunta+'" value="'+respuesta+'"'+solucion+'> '+respuesta+' ';
        
        var respuesta = "B";
        if (value.respuestas.solucion == respuesta){ var solucion = " checked='checked'";} else {var solucion =""};
        contenidoExamen += '<input class="solucion" type="radio" name="solucion'+value.id_pregunta+'" value="'+respuesta+'"'+solucion+'> '+respuesta+' ';
        
        var respuesta = "C";
        if (value.respuestas.solucion == respuesta){ var solucion = " checked='checked'";} else {var solucion =""};
        contenidoExamen += '<input class="solucion" type="radio" name="solucion'+value.id_pregunta+'" value="'+respuesta+'"'+solucion+'> '+respuesta+' ';
        
        var respuesta = "D";
        if (value.respuestas.solucion == respuesta){ var solucion = " checked='checked'";} else {var solucion =""};
        contenidoExamen += '<input class="solucion" type="radio" name="solucion'+value.id_pregunta+'" value="'+respuesta+'"'+solucion+'> '+respuesta+' ';
        
        contenidoExamen += '<br><br>';
    });
    $('#contenidoExamen').append(contenidoExamen);
    $('#botones').show();
}
// *** Funciones para guardar o descartar los cambios ***
function guardar(preguntas){
    // alert("vamos a guardar");
    var edited= {
        nombre: "",
        id_tema: "", 
        examen_json: "", 
        porcentaje_aprobar: undefined, 
        tiempo_minutos: undefined, 
        descripcion: ""
    };
        edited.id_tema = $('#tema option:selected').val();
        edited.nombre = $('#nombreExamen').val();
        edited.porcentaje_aprobar = $('#porcentaje').val();
        edited.tiempo_minutos = $('#tiempo').val();
        edited.descripcion = $('#descripcion').val();

        // Montar el objeto JSON con las preguntas
        var pregunta;
        var array_preguntas = [];
        $.each(preguntas, function(key, value){
            pregunta = '{"id_pregunta":'+ (key+1) +',"enunciado":"'+ $('#enunciado'+(key+1)).val() +'","respuestas":{"A":"'+ $('#respuesta_A'+(key+1)).val() +'","B":"'+ $('#respuesta_B'+(key+1)).val() +'","C":"'+ $('#respuesta_C'+(key+1)).val() +'","D":"'+ $('#respuesta_D'+(key+1)).val() +'","solucion":"'+ $('input[name=solucion'+(key+1)+']:checked').val() +'"}}'; 
            array_preguntas.push(pregunta);
        });
        edited.examen_json += '[';
        for(var i=0; i < array_preguntas.length; i++){
            edited.examen_json += array_preguntas[i];
            if(i+1 < array_preguntas.length){
                edited.examen_json += ",";
            }
        }
        edited.examen_json += ']';
        console.log(edited.examen_json);
        $.ajax({
            type: 'post', 
            url: rootURL + '/examen/update', 
            dataType: "json", 
            data: { id_examen: idExamen, nombre: edited.nombre, id_tema: edited.id_tema, examen_json: edited.examen_json, porcentaje_aprobar: edited.porcentaje_aprobar, tiempo_minutos: edited.tiempo_minutos, descripcion: edited.descripcion }, 
            success: function (data, textStatus, jqXHR) {
                alert('Exámen guardado con éxito');
            }, 
            error: function (jqXHR, textStatus, errorThrown) {
                alert('error: ' + textStatus);
            }
        });
}
function descartar(){
    alert("Se borraran los cambios realizados");
}