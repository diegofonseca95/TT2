Vue.component('user-tasks-statistics-chart', {
  props : [
    'user'
  ],
  data : function(){
    return {
      display : true,
      loading : true
    };
  },
  computed : {
    displayChart : function(){
      return !this.loading && this.display;
    }
  },
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
        idUsuario : this.user.idUsuario,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the blog list.
      fetch('/estadisticaUsuarioTarea', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          var nameRow = ['Fecha'];
          var matrix = [];
          for(var i in response.nombres){
            nameRow.push(response.nombres[i]);
          }
          matrix.push(nameRow);
          for(var i in response.result){
            var row = [];
            row.push(i);
            for(var j in response.result[i]){
              row.push(response.result[i][j]);
            }
            matrix.push(row);
          }
          this.display = (response.nombres.length > 0);
          this.loading = false;
          if(!this.displayChart){
            WarningToast('El usuario no ha realizado tareas');
            return;
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
      <div class="card-content center-align"
        v-if="display">
        <preloader v-if="loading">
        </preloader>
        <div id="user-tasks-statistics-chart"
          v-if="displayChart">
        </div>
      </div>
    </div>
  `
});