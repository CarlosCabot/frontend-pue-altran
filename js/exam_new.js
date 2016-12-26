$(document).ready(function () {
    $.ajax({
        url: 'src/public/examen/new'
        , type: 'post'        
        , dataType: "json"
        , success: function (){}
        , data: { nombre: 'Angular', id_tema: 1, examen_json: '[{"id_pregunta":1,"enunciado":"¿Como se denomina el lenguaje de estilos para navegador?","respuestas":{"A":"CSS","B":"HTML","C":"Javascript","D":"XML","solucion":"A"}},{"id_pregunta":2,"enunciado":"¿Como definiriamos el software Brackets?","respuestas":{"A":"como un IDE","B":"como un editor de texto","C":"como lenguaje de programación","D":"como aparatos","solucion":"B"}},{"id_pregunta":3,"enunciado":"¿Donde se ejecuta el lenguaje PHP?","respuestas":{"A":"En le navegador","B":"En mi casa","C":"En el servidor de aplicaciones php","D":"En ninguna de las anteriores","solucion":"C"}},{"id_pregunta":4,"enunciado":"¿Las siglas HTML son de?","respuestas":{"A":"Lenguaje de Programación de Hipertexto","B":"Lenguaje de Marcas de Ropa","C":"HyperText Markdown Language","D":"Lenguaje de Marcas de Hipertexto","solucion":"D"}},{"id_pregunta":5,"enunciado":"¿Finalizaremos el proyecto a tiempo?","respuestas":{"A":"Puede","B":"No","C":"Hombre claro","D":"¿Que proyecto?","solucion":"C"}}]', porcentaje_aprovar: 50, tiempo_minutos: 15}
    });
});

