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
      // TODO : Submit user-task.
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