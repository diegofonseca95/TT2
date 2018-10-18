const NewIterationCardDatepickerOptions = {
  format: "yyyy-mmm-dd",
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
  data : function(){
    return {
      newIteration : null
    };
  },
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

      // Fetch the users list.
      fetch('/agregarSprint', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          this.newIteration = response.sprint;
          SuccessToast(response.result);
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    },
    handleIterationCreation : function(){
      // TODO : Submit.
      var datepicker = document.querySelector('#new-iteration-date-input');
      if(datepicker.value === ''){
        WarningToast(
          'Selecciona la fecha' +
          ' de término.'
        );
        return;
      }
      this.submitIteration();
      if(newIteration !== null){
        this.$emit('iteration-created', this.newIteration);
        this.resetInformation();
      }
    },
    resetInformation : function(){
      document.querySelector('#new-iteration-form').reset();
      this.newIteration = null;
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