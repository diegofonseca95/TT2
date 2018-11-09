Vue.component('done-task-list-item', {
  props : ['task'],
  computed : {
    downloadLink : function(){
      return '/descargarEvidencia/' + this.task.tarea.idTarea;
    },
    dropdownId : function(){
      return 'done-task-dropdown-' + this.task.tarea.idTarea;
    },
    triggerId : function(){
      return 'done-task-trigger-' + this.task.tarea.idTarea;
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
          <a :href="downloadLink" target="_blank"
            Descargar evidencia
          </a>
        </li>
      </ul>
    </div>
  `
});