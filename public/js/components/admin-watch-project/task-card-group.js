Vue.component('task-card-group', {
  props : ['projectMembers'],
  data : function(){
    return {
      assignedTasksIds : [],
      tasks : []
    };
  },
  beforeCreate : function(){
    // TODO : Fetch the set of tasks.
    // TODO : Fetch the set of assigned tasks ids.
  },
  computed : {
    unassignedTasks : function(){
      return this.tasks.filter(
        task => this.assignedTasksIds.includes(task.idTarea)
      );
    }
  },
  methods : {
    handleTaskAssigned : function(task){
      if(!this.assignedTasksIds.includes(task.idTarea)){
        this.assignedTasksIds.push(task.idTarea);
      }
    },
    handleRemoveTask : function(task){
      // TODO : Remove the task.
    }
  },
  template : `
    <div>
      <tasks-card 
        @task-assigned="handleTaskAssigned($event)"
        @remove-task="handleRemoveTask($event)"
        :project-members="projectMembers"
        :tasks="unassignedTasks">
      </tasks-card>

      <new-task-card>
      </new-task-card>
    </div>
  `
});