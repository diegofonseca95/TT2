Vue.component('tasks-card', {
  props : [
    'runningIterations',
    'projectMembers',
    'permissions',
    'tasks'
  ],
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
    handleTaskUserSubmitted : function(pair){
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        idTarea : this.taskToAssign.idTarea,
        idUsuario : pair.user.idUsuario,
        idSprint : pair.iterationId,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the projects list.
      fetch('/asignarTarea', requestData)
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
    },
    handleTaskModalOpened : function(){
      this.$emit('task-modal-opened');
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
          :permissions="permissions"
          :tasks="tasks">
        </task-list>
        <choose-task-user-modal 
          @task-user-submitted="handleTaskUserSubmitted($event)"
          @task-modal-opened="handleTaskModalOpened"
          :running-iterations="runningIterations"
          :project-members="projectMembers"
          v-if="permissions.editar">
        </choose-task-user-modal>
      </div>
    </div>
  `
});