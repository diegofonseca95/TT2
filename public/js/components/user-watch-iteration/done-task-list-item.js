Vue.component('done-task-list-item', {
  props : ['task'],
  computed : {
    dropdownId : function(){
      return 'done-task-dropdown-' + this.task.idTarea;
    },
    triggerId : function(){
      return 'done-task-trigger-' + this.task.idTarea;
    }
  },
  mounted : function(){
    M.Dropdown.init(
      document.getElementById(this.triggerId),
      { alignment: 'right', constrainWidth: false }
    );
  },
  template : `
    <div class="row zero-margin-bottom">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <span class="card-title">
                Tarea {{ task.numeroTarea }}
                <a href='#!' class="right">
                  <i class="dropdown-trigger material-icons right"
                    :id="triggerId" :data-target="dropdownId"
                    title="Opciones">more_vert</i>
                </a>
              </span>
            </div>
            <div class="row zero-margin">
              <span class="col s12">
                {{ task.descripcion }}
              </span>
              <span class="col s12">
                Evidencia solicitada: {{ task.evidencia }}
              </span>
              <span class="col s12">
                Encargado: 
                <user-full-name-span :user="{}">
                </user-full-name-span>
              </span>
              <span class="col s12">
                Prioridad: 
                <priority-span :priority="task.puntaje">
                </priority-span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ul :id="dropdownId" class="dropdown-content">
        <li>
          <a href="#!">
            Ver evidencia
          </a>
        </li>
      </ul>
    </div>
  `
});