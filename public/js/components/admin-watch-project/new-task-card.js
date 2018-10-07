Vue.component('new-task-card', {
  data : function(){
    return {
      newTaskDeliverable : '',
      newTaskDescription : '',
      hasValidFields : false
    };
  },
  mounted : function(){
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
      var form = document.querySelector('#new-task-form');
      this.hasValidFields = false;
      $(form).submit();
      if(this.hasValidFields){
        // TODO : Submit.
        console.log(this.newTaskDescription);
        console.log(this.newTaskDeliverable);
        form.reset();
      }
    },
    resetInformation : function(){

      var form = document.querySelector('#new-task-form'); 
      form.reset();
      
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