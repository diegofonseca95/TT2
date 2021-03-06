Vue.component('task-card-group', {
  props : [
    'projectMembers',
    'permissions'
  ],
  data : function(){
    return {
      runningIterations : [],
      assignedTasksIds : [],
      tasks : []
    };
  },
  beforeCreate : function(){
    // Get the project id from the hidden input.
    var projectIdInput = document.querySelector('input[name="project-id"]');

    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = {
      idProyecto : projectIdInput.value,
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Send new task to the server.
    fetch('/obtenerTareas', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.assignedTasksIds = response.asignadas;
        this.tasks = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  computed : {
    unassignedTasks : function(){
      return this.tasks.filter(
        task => !this.assignedTasksIds.includes(task.idTarea)
      );
    }
  },
  methods : {
    handleTaskAssigned : function(task){
      if(!this.assignedTasksIds.includes(task.idTarea)){
        this.assignedTasksIds.push(task.idTarea);
      }
    },
    handleRemoveTask : function(removeTask){
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = {
        idTarea : removeTask.idTarea,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Send new task to the server.
      fetch('/eliminarTarea', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          this.tasks = this.tasks.filter(
            task => task.idTarea !== removeTask.idTarea
          );
          SuccessToast(response.result);
        }else{
            WarningToast(response.result);
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    },
    handleTaskCreated : function(task){
      this.tasks.push(task);
    },
    loadRunningIterations : function(){
      // Get the project id from the hidden input.
      var projectIdInput = document.querySelector('input[name="project-id"]');

      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = {
        idProyecto : projectIdInput.value,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the sprint list.
      fetch('/obtenerSprintsActivos', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          this.runningIterations = response.result;
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    }
  },
  template : `
    <div>
      <tasks-card
        @task-assigned="handleTaskAssigned($event)"
        @task-modal-opened="loadRunningIterations"
        @remove-task="handleRemoveTask($event)"
        :running-iterations="runningIterations"
        :project-members="projectMembers"
        :permissions="permissions"
        :tasks="unassignedTasks">
      </tasks-card>

      <new-task-card
        @task-created="handleTaskCreated($event)"
        v-if="permissions.editar">
      </new-task-card>
    </div>
  `
});
