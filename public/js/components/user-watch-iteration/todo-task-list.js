Vue.component('todo-task-list', {
  props : ['tasks'],
  methods : {
    handleTaskBegun : function(task){
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        _token : authToken.value,
        idTarea : task.idTarea
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the projects list.
      fetch('/iniciarTarea', requestData)
      .then(response => response.json())
      .then(function(response){
        console.log(response);
        if(response.status === 'OK'){
          this.$emit('task-begun', task);
          SuccessToast(response.result);
        }else{
          WarningToast(response.result);
        }
      }.bind(this)); 
    }
  },
  template : `
    <div class="col s12 m4 light-blue lighten-4 scrollable-board">
      <div class="row">
        <div class="col s12">
          <div class="card">
            <div class="card-content">
              <span class="card-title first-text center">
                <b>TO DO</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      <todo-task-list-item 
        v-for="task in tasks"
        @task-begun="handleTaskBegun"
        :key="task.idTarea"
        :task="task">
      </todo-task-list-item>
      <div class="row zero-margin-bottom"
        v-if="tasks.length === 0">
        <div class="col s12">
          <div class="card">
            <div class="card-content">
              No hay tareas por hacer.
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});