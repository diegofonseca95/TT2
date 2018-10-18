const NewIterationCardDatepickerOptions = {
  format: "dd-mmm-yyyy",
  i18n: {
    months: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
    monthsShort: [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ],
    weekdays: [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado" ],
    weekdaysShort: [ "Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb" ],
    weekdaysAbbrev: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
    cancel: "Cancelar", clear: "Limpiar", done: "Listo"
  }
};

Vue.component('new-iteration-card', {
  mounted : function(){
    // Initialize datepicker.
    M.Datepicker.init(
      document.querySelector('#new-iteration-date-input'), 
      NewIterationCardDatepickerOptions
    );
  },
  methods : {
    submitIteration : function(iteration){
      // Get the project id from the hidden input.
      var projectIdInput = document.querySelector('input[name="project-id"]');

      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      var datepicker = document.querySelector('#new-iteration-date-input');

      // The body of our request.
      var requestBody = { 
        idProyecto : projectIdInput.value,
        fecha_fin : datepicker.value,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      var iteration = null;

      // Fetch the users list.
      fetch('/agregarSprint', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          SuccessToast(response.result);
          iteration = response.iteration;
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));

      return iteration;
    },
    handleIterationCreation : function(){
      console.log("SOMETHING");
      // TODO : Submit.
      var datepicker = document.querySelector('#new-iteration-date-input');
      if(datepicker.value === ''){
        WarningToast(
          'Selecciona la fecha' +
          ' de término.'
        );
        return;
      }
      // TODO : Emit event with the new iteration.
      var newIteration = this.submitIteration();
      console.log(newIteration);

      if(newIteration !== null){
        this.$emit('iteration-created', newIteration);
        this.resetInformation();
      }
    },
    resetInformation : function(){
      document.querySelector('#new-iteration-form').reset();
      M.updateTextFields();
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>Agregar Iteración</b>
        </span>
        <div class="row">
          <div class="input-field col s12">
            <input class="datepicker" type="text" 
              name="new-iteration-date-input"
              id="new-iteration-date-input"/>
            <label for="new-iteration-date-input">
              Fecha de término
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <a class="btn remove-button-background right"
              href="#!" title="Agregar Iteración" 
              @click="handleIterationCreation">
              Agregar
            </a>
          </div>
        </div>
      </div>
    </div>
  `
});