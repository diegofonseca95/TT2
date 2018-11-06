/*
  This component represents the task list at the user
  info section in the dashboard.
*/
Vue.component('dashboard-task-list', {
  props : [
    'user' // The user looking at the dashboard.
  ],
  data : function(){
    return {
      tasksInfo : [] // The tasks the user belongs to.
    };
  },
  created : function(){
    var userInput = document.querySelector('input[name="user-id"]');
    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      idUsuario : userInput.value,
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
        var tasks = [];
        for(var i in response.result){
          tasks.push({
            project : response.result[i].proyecto,
            group : response.result[i].grupo,
            task : response.result[i].tarea
          });
        }
        this.tasksInfo = tasks;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  template : `
    <ul class="collection scrollable-collection">
      <li class="collection-item grey-color">
        <span>
          El usuario no ha realizado alguna tarea.
        </span>
      </li>
      <dashboard-task-list-item
        v-for="taskInfo in tasksInfo"
        :task-info="taskInfo"
        :key="taskInfo.key">
      </dashboard-task-list-item>
    </ul>
  `
});