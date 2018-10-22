Vue.component('task-list-item', {
  props : ['task'],
  methods : {
    handleAssignTask : function(){
      this.$emit('assign-task', this.task);
    },
    handleRemoveTask : function(){
      this.$emit('remove-task', this.task);
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">call_made</i>
      <div class="row">
        <span class="title truncate col s12">
          {{ task.nombreTarea }}
        </span>
        <span class="title truncate col s12">
          {{ task.descripcion }}
        </span>
        <span class="title truncate col s12">
          Evidencia solicitada: {{ task.evidencia }}
        </span>
        <span class="title truncate col s12">
          Prioridad: 
          <priority-span :priority="task.puntaje">
          </priority-span>
        </span>
        <div class="right">
          <a class="btn remove-button-background"
            href="#!" title="Eliminar tarea" 
            @click="handleRemoveTask">
            <i class="material-icons">remove</i>
          </a>
          <button class="btn modal-trigger remove-button-background"
            data-target="choose-task-user-modal" 
            title="Asignar tarea" 
            @click="handleAssignTask">
            Asignar
          </button>
        </div>
      </div>
    </li>
  `
});