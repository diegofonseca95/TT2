Vue.component('new-task-card', {
  data : function(){
    return {
      newTaskDeliverable : '',
      newTaskDescription : '',
      hasValidFields : false
    };
  },
  mounted : function(){
    // Initialize select.
    var select = document.getElementById('new-task-priority-input');
    M.FormSelect.init(select);
    // TODO : No JQuery
    $('#new-task-form').validate({
      rules : {
        'new-task-deliverable-input' : {
          required : true
        },
        'new-task-description-input' : {
          required : true
        }
      },
      messages : {
        'new-task-deliverable-input' : {
          required : 'Ingresa los detalles de la evidencia.'
        },
        'new-task-description-input' : {
          required : 'Ingresa la descripción de la tarea.'
        }
      },
      errorElement : 'div',
      errorPlacement : function(error, element){
        $(error).addClass('error-text');
        error.insertAfter(element);
      },
      submitHandler : function(form){
        this.hasValidFields = true;
      }.bind(this)
    });
  },
  methods : {
    handleTaskCreation : function(){
      this.hasValidFields = false;
      $('#new-task-form').submit();
      var select = document.querySelector('#new-task-priority-input');
      var option = select.options[select.selectedIndex];
      var value = parseInt(option.value);
      if(value === 0){
        WarningToast('Selecciona una prioridad.');
        return;
      }
      if(this.hasValidFields){
        this.submitTask({
          deliverable : this.newTaskDeliverable,
          description : this.newTaskDescription,
          priority : value
        });
      }
    },
    submitTask : function(task){
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
        descripcion : task.description,
        evidencia : task.deliverable,
        _token : authToken.value,
        puntaje : task.priority
      };

      requestData.body = JSON.stringify(requestBody);

      // Send new task to the server.
      fetch('/agregarTarea', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          console.log(response.tarea);
          this.$emit('task-created', response.tarea);
          SuccessToast(response.result);
          M.updateTextFields();
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
      this.resetInformation();
    },
    resetInformation : function(){
      this.newTaskDeliverable = '';
      this.newTaskDescription = '';
      document.querySelector('#new-task-form').reset();
      M.textareaAutoResize(
        document.querySelector('#new-task-description-input')
      );
      M.textareaAutoResize(
        document.querySelector('#new-task-deliverable-input')
      );
      M.updateTextFields();
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>Agregar tarea</b>
        </span>
        <div class="row">
          <form class="col s12" id="new-task-form">
            <div class="row">
              <div class="input-field col s12">
                <textarea class="materialize-textarea"
                  placeholder="Descripción de la tarea" 
                  name="new-task-description-input"
                  id="new-task-description-input"
                  v-model:value="newTaskDescription"></textarea>
                <label for="new-task-description-input">
                  Descripción de la tarea
                </label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <textarea class="materialize-textarea"
                  placeholder="Evidencia solicitada" 
                  name="new-task-deliverable-input" 
                  id="new-task-deliverable-input" 
                  v-model:value="newTaskDeliverable"></textarea>
                <label for="new-task-deliverable-input">
                  Evidencia solicitada
                </label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <select id="new-task-priority-input">
                  <option value="0" disabled 
                    selected>Seleccione la prioridad de la tarea.</option>
                  <option value="1">Muy baja</option>
                  <option value="2">Baja</option>
                  <option value="3">Media</option>
                  <option value="4">Alta</option>
                  <option value="5">Muy alta</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="row">
          <div class="col s12">
            <a class="btn remove-button-background right"
              href="#!" title="Agregar tarea"
              @click="handleTaskCreation">
              Agregar
            </a>
          </div>
        </div>
      </div>
    </div>
  `
});