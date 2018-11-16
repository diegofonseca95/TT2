Vue.component('group-users-statistics-chart', {
  data : function(){
    return {
      chartInfo : []
    };
  },
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
    fetch('/estadisticaUsuarioGrupo', requestData)
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
        this.chartInfo = points;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  methods : {
    drawChart : function(){
      var data = [['Grupos', 'Usuarios']];
      this.chartInfo.map(point => {
        data.push([point.x, point.y]);
      });
      var table = new google.visualization.arrayToDataTable(data);
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
    }
  },
  mounted : function(){
    google.charts.load('current', { 'packages' : ['bar'] });
    google.charts.setOnLoadCallback(this.drawChart);
  },
  template : `
    <div class="card">
      <div class="card-content">
        <!-- <span class="card-title">Card Title</span> -->
        <div id="group-users-statistics-chart">
        </div>
      </div>
    </div>
  `
});