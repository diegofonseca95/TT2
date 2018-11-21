Vue.component('user-tasks-statistics-chart', {
  props : [
    'user'
  ],
  watch : {
    user : function(){
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        idUsuario : user.idUsuario,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the blog list.
      fetch('/estadisticaUsuarioTarea', requestData)
      .then(response => response.json())
      .then(function(response){
        console.log(response);
        if(response.status === 'OK'){
          var matrix = [];
          for(var i in response.result){
            var row = [];
            row.push(i);
            for(var j in response.result[i]){
              row.push(response.response[i][j]);
            }
            matrix.push(row);
          }
          // Draw the chart.
          google.charts.load('current', { 'packages' : ['line'] });
          google.charts.setOnLoadCallback(function(){
            var table = new google.visualization.arrayToDataTable(matrix);
            var options = {
              title : 'Tareas del Usuario',
              curveType : 'function',
            };
            var chart = new google.charts.Line(
              document.querySelector(
                '#user-tasks-statistics-chart'
              )
            );
            chart.draw(table, options);
          });
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <div id="user-tasks-statistics-chart">
        </div>
      </div>
    </div>
  `
});