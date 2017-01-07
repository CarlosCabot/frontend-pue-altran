var array_datos = ["Notas medias por tema", "Notas medias total curso"];
var array_response;
var array_temas = [];
var array_notas = [];
$(function() {
  //Obtener los datos de los alumnos
  $.ajax({
    url: '../src/public/estadisticas/temas',
    type: 'GET',
    dataType: "json", //Lo mejor sería usar 'method' ya que nuestro jquery es una version mayor a 1.9.0
    success: function(response){
      array_response = response;
      $.each(array_response, function (index, element) {
        array_temas.push(array_response[index].tema);
        array_notas.push(array_response[index].nota_media);
      });
      creacion();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert("error");
    }
  });
});
function creacion() {
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
