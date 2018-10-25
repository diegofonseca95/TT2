Vue.component('choose-task-user-modal', {
  props : ['projectMembers'],
  data : function(){
    return {
      chosenIteration : 0,
      chosenUser : null,
      iterations : []
    };
  },
  beforeCreate : function(){
    // Get the project id from the hidden input.
    var projectIdInput = document.querySelector('input[name="project-id"]');

    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      idProyecto : projectIdInput.value,
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the sprint list.
    fetch('/obtenerSprintsActivos', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.iterations = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  methods : {
    handleTaskUserChosen : function(user){
      this.chosenUser = user;
    },
    handleSubmitUser : function(){
      if(this.chosenUser === null){
        WarningToast('Selecciona un usuario.');
        return;
      }
      var select = document.querySelector('#task-iteration-select');
      var option = select.options[select.selectedIndex];
      this.chosenIteration = parseInt(option.value);
      if(this.chosenIteration === 0){
        WarningToast('Selecciona una iteración.');
        return;
      }
      if(this.chosenUser !== null && this.chosenIteration !== 0){
        this.$emit('task-user-submitted', {
          iterationId : this.chosenIteration,
          user : this.chosenUser
        });
        this.chosenIteration = 0;
        this.chosenUser = null;
      }
    }
  },
  mounted : function(){
    var modal = document.querySelector('#choose-task-user-modal');
    M.Modal.init(modal);
  },
  updated : function(){
    var select = document.querySelector('#task-iteration-select');
    M.FormSelect.init(select);
  },
  template : `
    <div id="choose-task-user-modal" 
      class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Asignar tarea</h4>
        <div class="row">
          <form class="col s12">
            <div class="card">
              <div class="card-content">
                <div class="row">
                  <div class="input-field col s12">
                    <select id="task-iteration-select">
                      <option value="0" disabled selected>Selecciona iteración de la tarea</option>
                      <option v-for="iteration in iterations" 
                        :value="iteration.idSprint">Iteración {{ iteration.numeroSprint }} 
                        [{{ iteration.fecha_inicio }} &rarr; {{ iteration.fecha_fin }}]</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <task-user-list 
              @task-user-chosen="handleTaskUserChosen($event)"
              :project-members="projectMembers">
            </task-user-list>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn-flat"
          href="#!">
          Cancelar
        </a>
        <a class="modal-close waves-effect waves-green btn-flat"
          href="#!" @click="handleSubmitUser">
          Asignar tarea
        </a>
      </div>
    </div>
  `
});