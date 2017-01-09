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
        }, 
        error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
    // Manejador de eventos para refrescar examenes cuando
    // el usuario cambia el tema
    $('body').on('change', '#tema', function() {
        formContentExamenes = '';
        $('#contentExamenes').remove();
        $('#metaInfoExamen').empty();
        $('#contenidoExamen').empty();
        $('#botones').hide();
        var idTema = $(this).val();                
        if (idTema != 0) cargaExamenes(idTema);
    });
    // Manejador de eventos para mostrar el exámen cuando
    // el usuario ha seleccionado uno en concréto
    $('body').on('change', '#examen', function() {
        $('#metaInfoExamen').empty();
        $('#contenidoExamen').empty();
        $('#botones').hide();
        idExamen = $(this).val();                
        if (idExamen != 0) cargaFormulario(idExamen);
    });
    // Manejador de eventos para el botón "Guardar cambios"
    $('#guardar_examen').on('click', function() {
        guardar(JSON.parse(examen.examen_json));
    });
    
    // Manejador de evento para el botón "Descartar cambios"           
    $('#descartar').click(function() {
            if(window.confirm("¿Estas seguro? Los cambios se perderán.")){
                 location.reload();    
            }             
    });   

// fin de la función principal   
});	

// *** Funciones para seleccionar tema y examen ***
// Carga el select #tema con los temas disponibles
function cargaTema(array_temas) {	
        var formContentTemas = '<div class="form-group">'
                                    +'<label for="tema" class="col-md-3 control-label">Seleccionar tema:</label>'
                                    + '<div class="col-md-9">'
                                        +'<select id="tema" class="form-control">' 
                                            +'<option value="0">Selecciona tema</option>';
        $.each(array_temas, function (index, value) {
            formContentTemas += '<option value="' + value.id_tema + '">' + value.nombre + '</option>';
        });
        formContentTemas += '</select></div></div>';
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
            formContentExamenes = '<div id="contentExamenes" class="form-group">'
                                        +'<label for="examen" class="col-md-3 control-label">Seleccionar examen:</label>'
                                        + '<div class="col-md-9">'
                                            +'<select id="examen" class="form-control">'
                                                +'<option value="0">Selecciona exámen</option>';
			$.each(array_examenes, function (index, value) {
                formContentExamenes += '<option id="' + value.id_examen + '"' 
                                    + ' value="' + value.id_examen + '">' 
                                    + value.nombre + '</option>';
            });
            formContentExamenes += '</select></div></div>'
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
    var metaInfoHTML = '<h4 class="bg-info">Datos del examen "' + examen.nombre + '"</h4>'
                        +'<div class="form-group">'
                            +'<label for="nombreExamen" class="col-md-3 control-label">Nombre examen</label>'
                            +'<div class="col-md-9">'
                                +'<input type="text" id="nombreExamen" name="nombreExamen" value="" class="form-control"/>'
                            +'</div>'
                        +'</div>'
                        +'<div class="form-group">'
                            +'<label for="porcentaje" class="col-md-3 control-label">Porcentaje aprobado</label>'
                            +'<div class="col-md-9">'
                                +'<input type="number" id="porcentaje" name="porcentaje" value="" class="form-control"/>'
                            +'</div>'
                        +'</div>'
                        +'<div class="form-group">'
                            +'<label for="tiempo" class="col-md-3 control-label">Duración examen</label>'
                            +'<div class="col-md-9">'
                                +'<input type="number" id="tiempo" name="tiempo" value="" class="form-control"/>'
                            +'</div>'
                        +'</div>'
                        +'<div class="form-group">'
                            +'<label for="descripcion" class="col-md-3 control-label">Descripción</label>'
                            +'<div class="col-md-9">'
                                +'<textarea id="descripcion" rows="4" cols="50" class="form-control"> </textarea>'
                            +'</div>'
                        +'</div>';
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
    var contenidoExamen ='<h4 class="bg-info">Contenido del examen "' + examen.nombre + '"</h4>';
    $.each(preguntas, function(key, value){
        contenidoExamen += '<div class="row"><h4 class="col-md-3">Pregunta '+ value.id_pregunta +'</h4></div>'
                            +'<div class="form-group">'
                                +'<label for="enunciado'+value.id_pregunta+'" class="col-md-3 control-label">Enunciado</label>'
                                +'<div class="col-md-9">'
                                    +'<input type="text" id="enunciado'+value.id_pregunta+'" name="enunciado" class="form-control" value="' + value.enunciado + '">'
                                +'</div>'
                            +'</div>'
                            +'<div class="form-group">'
                                +'<label for="respuesta_A'+value.id_pregunta+'" class="col-md-3 control-label">Respuesta A</label>'
                                +'<div class="col-md-9">'
                                    + '<input type="text" id="respuesta_A'+value.id_pregunta+'" name="respuesta_A" class="form-control" value="' + value.respuestas.A +'">'
                                +'</div>'
                            +'</div>'
                            +'<div class="form-group">'
                                +'<label for="respuesta_B'+value.id_pregunta+'" class="col-md-3 control-label">Respuesta B</label>'
                                +'<div class="col-md-9">'
                                    + '<input type="text" id="respuesta_B'+value.id_pregunta+'" name="respuesta_B" class="form-control" value="' + value.respuestas.B +'">'
                                +'</div>'
                            +'</div>'
                            +'<div class="form-group">'
                                +'<label for="respuesta_C'+value.id_pregunta+'" class="col-md-3 control-label">Respuesta C</label>'
                                +'<div class="col-md-9">'
                                    + '<input type="text" id="respuesta_C'+value.id_pregunta+'" name="respuesta_C" class="form-control" value="' + value.respuestas.C +'">'
                                +'</div>'
                            +'</div>'
                            +'<div class="form-group">'
                                +'<label for="respuesta_D'+value.id_pregunta+'" class="col-md-3 control-label">Respuesta D</label>'
                                +'<div class="col-md-9">'
                                    + '<input type="text" id="respuesta_D'+value.id_pregunta+'" name="respuesta_D" class="form-control" value="' + value.respuestas.D +'">'
                                +'</div>'
                            +'</div>';
                    
        contenidoExamen +='<div class="form-group">'
                                + '<label class="col-md-3 control-label">Solución: </label>' 
                                + '<div class="col-md-9">';
        
        var respuesta = "A";
        if (value.respuestas.solucion == respuesta){ var solucion = " checked='checked'";} else {var solucion =""};
        contenidoExamen += '<label class="checkbox-inline">'
                                +'<input type="radio" name="solucion'+value.id_pregunta+'" value="'+respuesta+'"'+solucion+'> '
                                +respuesta+'</label>';
        
        var respuesta = "B";
        if (value.respuestas.solucion == respuesta){ var solucion = " checked='checked'";} else {var solucion =""};
        contenidoExamen += '<label class="checkbox-inline">'
                                +'<input type="radio" name="solucion'+value.id_pregunta+'" value="'+respuesta+'"'+solucion+'> '
                                +respuesta+'</label>';

        var respuesta = "C";
        if (value.respuestas.solucion == respuesta){ var solucion = " checked='checked'";} else {var solucion =""};
        contenidoExamen += '<label class="checkbox-inline">'
                                +'<input type="radio" name="solucion'+value.id_pregunta+'" value="'+respuesta+'"'+solucion+'> '
                                +respuesta+'</label>';
        
        var respuesta = "D";
        if (value.respuestas.solucion == respuesta){ var solucion = " checked='checked'";} else {var solucion =""};
        contenidoExamen += '<label class="checkbox-inline">'
                                +'<input type="radio" name="solucion'+value.id_pregunta+'" value="'+respuesta+'"'+solucion+'> '
                                +respuesta+'</label>';
        
        contenidoExamen += '</div></div>';
    });
    $('#contenidoExamen').append(contenidoExamen);
    $('#botones').show();
}
// *** Funciones para guardar o descartar los cambios ***
function guardar(preguntas){
    // alert("vamos a guardar");
    var r = confirm("¿Estas seguro?");
    if (r == true) {
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
                        alert('¡Exámen editado con éxito!');
                        window.location.replace("editar_examen.php");
                    }, 
                    error: function (jqXHR, textStatus, errorThrown) {
                        //alert('error: ' + textStatus);
                    }
                });
    }
}