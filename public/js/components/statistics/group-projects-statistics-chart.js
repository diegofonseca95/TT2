Vue.component('group-projects-statistics-chart', {
  beforeCreate : function(){
    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the blog list.
    fetch('/estadisticaProyectoGrupo', requestData)
    .then(response => response.json())
    .then(function(response){
      console.log(response);
      if(response.status === 'OK'){
        var result = response.result;
        var points = [];
        for(var i in result.grupos){
          var grupo = result.grupos[i];
          points.push({
            y : result.cantidad[grupo.idGrupo],
            x : grupo.nombreGrupo
          });
        }
        // Draw the chart.
        google.charts.load('current', { 'packages' : ['bar'] });
        var data = [['Grupos', 'Proyectos']];
        points.map(point => {
          data.push([point.x, point.y]);
        });
        var table = new google.visualization.arrayToDataTable(data);
        var options = {
          title : 'Proyectos por Grupo',
          bars : 'horizontal'
        };
        var chart = new google.charts.Bar(
          document.querySelector(
            '#group-projects-statistics-chart'
          )
        );
        chart.draw(table, options);
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  template : `
    <div class="card">
      <div class="card-content">
        <div id="group-projects-statistics-chart">
        </div>
      </div>
    </div>
  `
});