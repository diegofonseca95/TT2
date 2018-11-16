Vue.component('project-tasks-statistics-chart', {
  mounted : function(){
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
    fetch('/estadisticaTareaProyecto', requestData)
    .then(response => response.json())
    .then(function(response){
      console.log(response);
      if(response.status === 'OK'){
        var result = response.result;
        var points = [];
        for(var i in result.proyectos){
          var project = result.proyectos[i];
          points.push({
            y : result.cantidad[project.idProyecto],
            x : project.nombreProyecto
          });
        }
        // Draw the chart.
        google.charts.load('current', { 'packages' : ['bar'] });
        google.charts.setOnLoadCallback(function(){
          var data = [['Grupos', 'Usuarios']];
          points.map(point => {
            data.push([point.x, point.y]);
          });
          var table = new google.visualization.arrayToDataTable(data);
          var options = {
            title : 'Tareas por Proyecto',
            bars : 'horizontal'
          };
          var chart = new google.charts.Bar(
            document.querySelector(
              '#project-tasks-statistics-chart'
            )
          );
          chart.draw(table, options);
        });
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  template : `
    <div class="card">
      <div class="card-content">
        <div id="project-tasks-statistics-chart">
        </div>
      </div>
    </div>
  `
});