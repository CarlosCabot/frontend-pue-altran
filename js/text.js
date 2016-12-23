$.ajax({
    type="POST",
    url: rootUrl + '/examen/new',
    data: JSON.stringify({"id_usuario":1,"id_examen":2,"fecha_hora":"","respuestas":[{"id_pregunta":1,"respuesta":"A"}, {"id_pregunta":2,"respuesta":"C"}]}),
    success: alert("ok"),
    dataType: 
});
