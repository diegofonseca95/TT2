Vue.component('tasks-card', {
  props : ['tasks', 'projectMembers'],
  data : function(){
    return {
      taskToAssign : null
    };
  },
  methods : {
    handleAssignTask : function(task){
      this.taskToAssign = task;
    },
    handleRemoveTask : function(task){
      this.$emit('remove-task', task);
    },
    handleTaskUserSubmitted : function(user){
      console.log(user);

      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        idTarea : this.taskToAssign.idTarea,
        idUsuario : user.idUsuario,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the projects list.
      fetch('/asignarUsuarioTarea', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          this.$emit('task-assigned', this.taskToAssign);
          SuccessToast(response.result);
          this.taskToAssign = null;
        }else{
          WarningToast(response.result);
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>Tareas sin asignar</b>
        </span>
        <task-list
          @assign-task="handleAssignTask($event)"
          @remove-task="handleRemoveTask($event)"
          :tasks="tasks">
        </task-list>
        <choose-task-user-modal 
          @task-user-submitted="handleTaskUserSubmitted($event)"
          :project-members="projectMembers">
        </choose-task-user-modal>
      </div>
    </div>
  `
});