Vue.component('task-list', {
  props : ['tasks'],
  methods : {
    handleAssignTask : function(task){
      this.$emit('assign-task', task);
    },
    handleRemoveTask : function(task){
      this.$emit('remove-task', task);
    }
  },
  template : `
    <ul class="collection scrollable-collection">
      <li class="collection-item" 
        v-if="tasks.length === 0">
        <span>
          No hay tareas sin asignar
        </span>
      </li>
      <task-list-item
        v-for="task in tasks"
        @assign-task="handleAssignTask($event)"
        @remove-task="handleRemoveTask($event)"
        :key="task.idTarea"
        :task="task">
      </task-list-item>
    </ul>
  `
});