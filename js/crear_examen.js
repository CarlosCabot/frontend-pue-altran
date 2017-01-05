//Variables globales
var rootURL = "../src/public";
var array_temas;
// Objeto JSON
var examen = {
    nombre: ""
    , id_tema: ""
    , examen_json: ""
    , porcentaje_aprobar: undefined
    , tiempo_minutos: undefined
    , descripcion: ""
}

var array_preguntas = [];

// Equivalente a document.ready()
$(function () {
    
    //Obtener todos los temas de examen de la api
    $.ajax({
        type: 'GET'
        , url: rootURL + '/temas'
        , dataType: "json"
        , success: function (response) {
            array_temas = response;
        }
        , error: function (jqXHR, textStatus, errorThrown) {
            alert(textStatus);
        }
    });
    
    // Funcion al evento click del boton crear_examen
    $('body').on('click', '#crear_examen', function () {      
        // Eliminar el boton crear examen
        $('#crear_examen').remove();        
        
        // Creación de un select con los temas disponibles de la api y el resto de inputs excepto el campo examen_json
        var formContentTemas = 
        '<form action="#" class="form-horizontal" onsubmit="return false">'
        + '<div class="form-group">'
            + '<label for="temaSelection" class="col-sm-3 control-label">Seleccionar Tema:</label>'
            + '<div class="col-sm-9">'
                + '<select id="temaSelection" name="temaSelection" class="form-control">'
                    + '<option>Seleccionar Tema</option>';
        
        $.each(array_temas, function (index, value) {
            formContentTemas += '<option id="' + value.id_tema + '"' + 'value="' + value.id_tema + '">' + value.nombre + '</option>';
        });
        
        formContentTemas += '</select></div></div>';        
        $('#contenedor').append(formContentTemas 
            + '<div class="form-group">'
                + '<label for="temaSelection" class="col-sm-3 control-label">Nombre examen: </label>' 
                + '<div class="col-sm-9">' 
                    + '<input type="text" class="form-control" id="nombre_exam" name="nombre_exam" placeholder="Nombre del examen">' 
                + '</div>' 
            + '</div>'
            + '<div class="form-group">' 
                + '<label for="temaSelection" class="col-sm-3 control-label">Porcentaje de aciertos: </label>' 
                + '<div class="col-sm-9">'
                    + '<input type="number" id="porcentaje" name="porcentaje" class="form-control" placeholder="Porcentaje de aciertos">' 
                + '</div>' 
            + '</div>' 
            + '<div class="form-group">' 
                + '<label for="temaSelection" class="col-sm-3 control-label">Duración examen: </label>'
                + '<div class="col-sm-9">' 
                    + '<input type="number" id="tiempo_minutos" name="tiempo_minutos" class="form-control" placeholder="Duración examen">' 
                + '</div>' 
            + '</div>'
            + '<div class="form-group">'
                + '<label for="temaSelection" class="col-sm-3 control-label">Descripción del examen: </label>'
                + '<div class="col-sm-9">'
                    + '<textarea id="descipcion" rows="4" cols="50" placeholder="Descripción del examen" class="form-control"></textarea>' 
                + '</div>'
            + '</div>'
            + '<div class="form-group">'
                + '<label for="temaSelection" class="col-sm-3 control-label"></label>' 
                + '<div class="col-sm-9">' 
                    + '<button id="aceptar_tema_nombre" class="btn btn-primary">Crear preguntas</button>' 
                + '</div>'
            + '</div>' 
        + '</form>');
    });
       
    // Almacenar datos examen en la variable
    $('body').on('click', '#aceptar_tema_nombre', function () {
            examen.id_tema = $('#temaSelection option:selected').val();
            examen.nombre = $('#nombre_exam').val();
            examen.porcentaje_aprobar = $('#porcentaje').val();
            examen.tiempo_minutos = $('#tiempo_minutos').val();
            examen.descripcion = $('#descipcion').val();
        
            // Eliminar los inputs previos
            $('#contenedor').empty();     
        
            // Añadir los inputs para nueva pregunta
            $('#contenedor').append(
            '<form action="#" class="form-horizontal" onsubmit="return false">'
                + '<div class="form-group">'
                    + '<label for="temaSelection" class="col-sm-3 control-label">Enunciado: </label>' 
                    + '<div class="col-sm-9">' 
                        + '<input type="text" id="enunciado" name="enunciado" class="form-control" placeholder="Enunciado de la pregunta">'
                    + '</div>'
                + '</div>'           
                + '<div class="form-group">'
                    + '<label for="temaSelection" class="col-sm-3 control-label">Respuesta A: </label>' 
                    + '<div class="col-sm-9">'                     
                        + '<input type="text" id="respuesta_A" name="respuesta_A" class="form-control" placeholder="Respuesta A">' 
                    + '</div>'
                + '</div>'
                + '<div class="form-group">'
                    + '<label for="temaSelection" class="col-sm-3 control-label">Respuesta B: </label>' 
                    + '<div class="col-sm-9">'                     
                        + '<input type="text" id="respuesta_B" name="respuesta_B" class="form-control" placeholder="Respuesta B">'
                    + '</div>'
                + '</div>'
                + '<div class="form-group">'
                    + '<label for="temaSelection" class="col-sm-3 control-label">Respuesta C: </label>' 
                    + '<div class="col-sm-9">'                     
                        + '<input type="text" id="respuesta_C" name="respuesta_C" class="form-control" placeholder="Respuesta C">'
                    + '</div>'
                + '</div>'
                + '<div class="form-group">'
                    + '<label for="temaSelection" class="col-sm-3 control-label">Respuesta D: </label>' 
                    + '<div class="col-sm-9">' 
                        + '<input type="text" id="respuesta_D" name="respuesta_D" class="form-control" placeholder="Respuesta D">'
                    + '</div>'
                + '</div>'
                + '<div class="form-group">'
                    + '<label for="temaSelection" class="col-sm-3 control-label">Solución: </label>' 
                    + '<div class="col-sm-9">'                                     
                        + '<label class="checkbox-inline"><input class="solucion" type="radio" name="solucion" value="A"> A </label>'
                
                        + '<label class="checkbox-inline"><input class="solucion" type="radio" name="solucion" value="B"> B </label>'
                
                        + '<label class="checkbox-inline"><input class="solucion" type="radio" name="solucion" value="C"> C </label>'
                
                        + '<label class="checkbox-inline"><input class="solucion" type="radio" name="solucion" value="D"> D </label>'
                    + '</div>'
                + '</div>' 
                + '<div class="form-group">'
                    + '<label for="temaSelection" class="col-sm-3 control-label"></label>' 
                    + '<div class="col-sm-9">' 
                        + '<button id="nueva_pregunta" class="btn btn-default" style="margin-right:5px;">Añadir Pregunta</button>'
                        + '<button id="guardar_examen" class="btn btn-primary">Guardar examen</button>' 
                    + '</div>'
                + '</div>'
            + '</form>');       
    });
    
    // Funcionalidad del boton "Añadir pregunta"
    $('body').on('click', '#nueva_pregunta', function () {            
        var pregunta = '{"id_pregunta":'+ array_preguntas.length+1 +',"enunciado":"'+ $('#enunciado').val() +'","respuestas":{"A":"'+ $('#respuesta_A').val() +'","B":"'+ $('#respuesta_B').val() +'","C":"'+ $('#respuesta_C').val() +'","D":"'+ $('#respuesta_D').val() +'","solucion":"'+ $('input[name=solucion]:checked').val() +'"}}';    
         
        //Añadir la pregunta al array
        array_preguntas.push(pregunta);
        
        //Limpiar los campos input
        $('#enunciado').val('');
        $('#respuesta_A').val('');
        $('#respuesta_B').val('');
        $('#respuesta_C').val('');
        $('#respuesta_D').val('');
        $('.solucion').prop('checked', false);     
    });

    // Funcionalidad del boton Guardar examen
    $('body').on('click', '#guardar_examen', function () {
        examen.examen_json += '[';
        for(var i=0; i < array_preguntas.length; i++){
            examen.examen_json += array_preguntas[i];
            if(i+1 < array_preguntas.length){
                examen.examen_json += ",";
            }
        }
        examen.examen_json += ']';
        
        $.ajax({
            type: 'post'
            , url: rootURL + '/examen/new'
            , dataType: "json"
            , data: { nombre: examen.nombre, id_tema: examen.id_tema, examen_json: examen.examen_json, porcentaje_aprobar: examen.porcentaje_aprobar, tiempo_minutos: examen.tiempo_minutos, descripcion: examen.descripcion }
            , success: function (data, textStatus, jqXHR) {
                alert(textStatus);
            }
            , error: function (jqXHR, textStatus, errorThrown) {
                alert('error: ' + textStatus);
            }
        }); 
    });  
});