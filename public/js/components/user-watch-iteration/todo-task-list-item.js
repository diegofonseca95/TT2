Vue.component('todo-task-list-item', {
  props : ['task'],
  computed : {
    dropdownId : function(){
      return 'todo-task-dropdown-' + this.task.idTarea;
    },
    triggerId : function(){
      return 'todo-task-trigger-' + this.task.idTarea;
    }
  },
  mounted : function(){
    M.Dropdown.init(
      document.querySelector('#' + this.triggerId),
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
                Tarea 1
                <a href='#!' class="right">
                  <i class="dropdown-trigger material-icons right"
                    :id="triggerId" :data-target="dropdownId"
                    title="Opciones">more_vert</i>
                </a>
              </span>
            </div>
            <div class="row zero-margin">
              <span class="col s12">
                Descripción de la tarea 1
              </span>
              <span class="col s12">
                Evidencia solicitada: Fotos del evento
              </span>
              <span class="col s12">
                Encargado: Victor Noriega
              </span>
              <span class="col s12">
                Prioridad: alta
              </span>
            </div>
          </div>
        </div>
      </div>
      <ul :id="dropdownId" class="dropdown-content">
        <li>
          <a href="#!">
            Iniciar tarea
          </a>
        </li>
      </ul>
    </div>
  `
});