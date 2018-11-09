Vue.component('todo-task-list-item', {
  props : ['task'],
  computed : {
    dropdownId : function(){
      return 'todo-task-dropdown-' + this.task.tarea.idTarea;
    },
    triggerId : function(){
      return 'todo-task-trigger-' + this.task.tarea.idTarea;
    }
  },
  mounted : function(){
    console.log(this.task);
    if(this.task.editable){
      M.Dropdown.init(
        document.getElementById(this.triggerId),
        { alignment: 'right', constrainWidth: false }
      );
    }
  },
  updated : function(){
    console.log(this.task);
    if(this.task.editable){
      M.Dropdown.init(
        document.getElementById(this.triggerId),
        { alignment: 'right', constrainWidth: false }
      );
    }
  },
  methods : {
    handleBeginTask : function(){
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        idTarea : this.task.tarea.idTarea,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the projects list.
      fetch('/iniciarTarea', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          console.log(response.tarea);
          this.$emit('task-begun', response.tarea);
          SuccessToast(response.result);
        }else{
          WarningToast(response.result);
        }
      }.bind(this)); 
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
                <a href='#!' class="right"
                  v-if="task.editable">
                  <i class="dropdown-trigger material-icons right"
                    :id="triggerId" :data-target="dropdownId"
                    v-if="task.editable"
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
          <a href="#!"
            @click="handleBeginTask">
            Iniciar tarea
          </a>
        </li>
      </ul>
    </div>
  `
});