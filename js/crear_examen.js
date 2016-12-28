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
        var formContentTemas = '<select id="temaSelection" name="temaSelection"><option value="">Seleccionar Tema</option>';
        $.each(array_temas, function (index, value) {
            formContentTemas += '<option id="' + value.id_tema + '"' + 'value="' + value.id_tema + '">' + value.nombre + '</option>';
        });
        formContentTemas += '</select>';        
        $('#contenedor').append(formContentTemas + '<br><input type="text" id="nombre_exam" name="nombre_exam" value="" placeholder="Nombre del examen"><br><input type="number" id="porcentaje" name="porcentaje" value="" placeholder="Porcentaje de aciertos"><br><input type="number" id="tiempo_minutos" name="tiempo_minutos" value="" placeholder="Duración examen"><br><textarea id="descipcion" rows="4" cols="50" placeholder="Descripción del examen"></textarea><br><button id="aceptar_tema_nombre">Aceptar</button>');
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
            $('#contenedor').append('<input type="text" id="enunciado" name="enunciado" value="" placeholder="Enunciado de la pregunta"><br><input type="text" id="respuesta_A" name="respuesta_A" value="" placeholder="Respuesta A"><br><input type="text" id="respuesta_B" name="respuesta_B" value="" placeholder="Respuesta B"><br><input type="text" id="respuesta_C" name="respuesta_C" value="" placeholder="Respuesta C"><br><input type="text" id="respuesta_D" name="respuesta_D" value="" placeholder="Respuesta D"><br><input class="solucion" type="radio" name="solucion" value="A"> A <br><input class="solucion" type="radio" name="solucion" value="B"> B <br><input class="solucion" type="radio" name="solucion" value="C"> C <br><input class="solucion" type="radio" name="solucion" value="D"> D <br><button id="nueva_pregunta">Añadir Pregunta</button><button id="guardar_examen">Guardar examen</button>');       
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