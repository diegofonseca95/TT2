Vue.component('project-tasks-statistics-chart', {
  data : function(){
    return {
      loading : true
    };
  },
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
      if(response.status === 'OK'){
        var result = response.result;
        var projectsInfo = [];
        for(var i in result.proyectos){
          var project = result.proyectos[i];
          projectsInfo.push({
            done : result.terminadas[project.idProyecto],
            total : result.cantidad[project.idProyecto],
            name : project.nombreProyecto
          });
        }
        this.loading = false;
        // Draw the chart.
        google.charts.load('current', { 'packages' : ['bar'] });
        google.charts.setOnLoadCallback(function(){
          var table = new google.visualization.DataTable();
          table.addColumn('string', 'Proyectos');
          table.addColumn('number', 'Total de Tareas');
          table.addColumn('number', 'Tareas Terminadas');
          projectsInfo.map(info => {
            table.addRow(
              [info.name, info.total, info.done]
            );
          });
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
      <div class="card-content center-align">
        <preloader v-if="loading">
        </preloader>
        <div id="project-tasks-statistics-chart" v-if="!loading">
        </div>
      </div>
    </div>
  `
});