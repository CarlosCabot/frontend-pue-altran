var array_datos = ["Notas medias por tema", "Notas medias total curso"];
var array_response;
var array_temas = [];
var array_notas = [];

var array_etiquetas = ["aprobados", "suspensos"];
var array_resultados = [];

$(function() {
  //Obtener los datos de los temas
  $.ajax({
    url: '../src/public/estadisticas/temas',
    type: 'GET',
    dataType: "json", //Lo mejor sería usar 'method' ya que nuestro jquery es una version mayor a 1.9.0
    success: function(response){
      array_response = response;
      $.each(array_response, function (index, element) {
        array_temas.push(array_response[index].nombre);
        array_notas.push(array_response[index].nota_media);
      });
      creacionBarras();
      //creacionPie();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("error");
    }
  });
    
  //Obtener los datos de alumnos aprobados
  $.ajax({
    url: '../src/public/estadisticas/global_results',
    type: 'GET',
    dataType: "json", //Lo mejor sería usar 'method' ya que nuestro jquery es una version mayor a 1.9.0
    success: function(response){
      array_resultados.push(response[0].aprobados);
      array_resultados.push(response[0].suspensos);
      creacionPie();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("error");
    }
  });    
    
});

function creacionBarras() {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: array_temas,
          datasets: [{
              label: 'Notas medias por tema',
              data: array_notas,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}

function creacionPie() {
  var ctx = document.getElementById("myPie");
  var data = {
      labels: array_etiquetas,
      datasets: [
          {
              data: array_resultados,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.7)',
                  'rgba(54, 162, 235, 0.7)',
                  'rgba(255, 206, 86, 0.7)',
                  'rgba(75, 192, 192, 0.7)',
                  'rgba(153, 102, 255, 0.7)',
                  'rgba(255, 159, 64, 0.7)'
              ],
              hoverBackgroundColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ]
          }]
  };
  // For a pie chart
  var myPieChart = new Chart(ctx,{
      type: 'pie',
      data: data,
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}
