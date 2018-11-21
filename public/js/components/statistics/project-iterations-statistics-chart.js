Vue.component('project-iterations-statistics-chart', {
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
    fetch('/estadisticaIteracionProyecto', requestData)
    .then(response => response.json())
    .then(function(response){
      console.log(response);
      if(response.status === 'OK'){
        var result = response.result;
        var points = [];
        for(var i in result.proyectos){
          var project = result.proyectos[i];
          points.push({
            iterations : result.cantidad[project.idProyecto],
            name : project.nombreProyecto
          });
        }
        this.loading = false;
        // Draw the chart.
        google.charts.load('current', { 'packages' : ['bar'] });
        google.charts.setOnLoadCallback(function(){
          var table = new google.visualization.DataTable();
          table.addColumn('string', 'Proyectos');
          table.addColumn('number', 'Iteraciones');
          points.map(point => {
            table.addRow([point.name, point.iterations]);
          });
          var options = {
            title : 'Iteraciones por Proyecto',
            bars : 'horizontal'
          };
          var chart = new google.charts.Bar(
            document.querySelector(
              '#project-iterations-statistics-chart'
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
        <div id="project-iterations-statistics-chart"
          v-if="!loading">
        </div>
      </div>
    </div>
  `
});