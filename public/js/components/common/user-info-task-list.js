Vue.component('user-info-task-list', {
  props : ['user'],
  data : function(){
    return {
      userTasksInfo : []
    };
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

      // Fetch the projects list.
      fetch('/obtenerTareasUsuario', requestData)
      .then(response => response.json())
      .then(function(response){
        console.log(response);
        if(response.status === 'OK'){
          // TODO : Toast if succeeded
          var tasksInfo = [];
          for(var i in response.result){
            tasksInfo.push({
              project : response.result[i].proyecto,
              group : response.result[i].grupo,
              task : response.result[i].tarea
            });
          }
          this.userTasksInfo = tasksInfo;
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    }
  },
  template : `
    <ul class="collection scrollable-collection">
      <user-info-task-list-item
        v-for="taskInfo in userTasksInfo"
        :task-info="taskInfo"
        :key="taskInfo.key">
      </user-info-task-list-item>
      <li class="collection-item"
        v-if="userTasksInfo.length === 0">
        El usuario no ha completado alguna tarea.
      </li>
    </ul>
  `
});