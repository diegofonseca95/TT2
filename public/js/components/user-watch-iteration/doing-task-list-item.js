Vue.component('doing-task-list-item', {
  props : ['task'],
  computed : {
    dropdownId : function(){
      return 'doing-task-dropdown-' + this.task.idTarea;
    },
    triggerId : function(){
      return 'doing-task-trigger-' + this.task.idTarea;
    }
  },
  mounted : function(){
    if(this.task.editable){
      M.Dropdown.init(
        document.getElementById(this.triggerId),
        { alignment: 'right', constrainWidth: false }
      );
    }
  },
  template : `
    <div class="row zero-margin-bottom">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <span class="card-title">
                Tarea {{ task.tarea.numeroTarea }}
                <a href='#!' class="right">
                  <i class="dropdown-trigger material-icons right"
                    :id="triggerId" :data-target="dropdownId"
                    title="Opciones">more_vert</i>
                </a>
                <i class="material-icons right" 
                  title="Pendiente de validar"
                  v-if="task.status.pendiente">timer</i>
                <i class="material-icons right" 
                  title="Evidencia rechazada"
                  v-if="task.status.rechazada">close</i>
              </span>
            </div>
            <div class="row zero-margin">
              <span class="col s12">
                {{ task.tarea.descripcion }}
              </span>
              <span class="col s12">
                Evidencia solicitada: {{ task.tarea.evidencia }}
              </span>
              <span class="col s12">
                Encargado: 
                <user-full-name-span :user="task.encargado">
                </user-full-name-span>
              </span>
              <span class="col s12">
                Prioridad: 
                <priority-span :priority="task.tarea.puntaje">
                </priority-span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ul :id="dropdownId" class="dropdown-content"
        v-if="task.editable">
        <li>
          <a class="modal-trigger" href="#modal_uploadDeliverable">
            Subir evidencia
          </a>
        </li>
        <li>
          <a href="#!">
            Ver evidencia
          </a>
        </li>
        <li>
          <a href="#!">
            Validar evidencia
          </a>
        </li>
        <li>
          <a href="#!">
            Rechazar evidencia
          </a>
        </li>
      </ul>
    </div>
  `
});