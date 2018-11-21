Vue.component('group-users-statistics-chart', {
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
    fetch('/estadisticaUsuarioGrupo', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        var result = response.result;
        var points = [];
        for(var i in result.grupos){
          var grupo = result.grupos[i];
          points.push({
            deleted : result.eliminados[grupo.idGrupo],
            users : result.cantidad[grupo.idGrupo],
            name : grupo.nombreGrupo
          });
        }
        this.loading = false;
        // Draw the chart.
        google.charts.load('current', { 'packages' : ['bar'] });
        google.charts.setOnLoadCallback(function(){
          var table = new google.visualization.DataTable();
          table.addColumn('string', 'Grupos');
          table.addColumn('number', 'Usuarios Activos');
          table.addColumn('number', 'Usuarios Eliminados');
          points.map(point => {
            table.addRow(
              [point.name, point.users, point.deleted]
            );
          });
          var options = {
            title : 'Usuarios por Grupo',
            bars : 'horizontal'
          };
          var chart = new google.charts.Bar(
            document.querySelector(
              '#group-users-statistics-chart'
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
        <div id="group-users-statistics-chart" v-if="!loading">
        </div>
      </div>
    </div>
  `
});