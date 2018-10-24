const IterationInfoCardDatepickerOptions = {
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

Vue.component('iteration-info-card', {
  data : function(){
    return {
      newIterationDate : '',
      iteration : {},
      project : {},
    };
  },
  beforeCreate : function(){
    // Get the project id from the hidden input.
    var iterationIdInput = document.querySelector('input[name="iteration-id"]');

    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      idSprint : iterationIdInput.value,
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the projects list.
    fetch('/obtenerSprint', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.iteration = response.result.sprint;
        this.project = response.result.proyecto;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  mounted : function(){
    var picker = document.querySelector('#new-iteration-datepicker');
    var options = IterationInfoCardDatepickerOptions;
    options.onClose = function(){
      if(picker.value !== ''){
        this.newIterationDate = picker.value;
      }
    }.bind(this);
    M.Datepicker.init(picker, options);
  },
  methods : {
    openDatePicker : function(){
      var picker = document.querySelector('#new-iteration-datepicker');
      M.Datepicker.getInstance(picker).open();
      picker.value = '';
    }
  },
  watch : {
    newIterationDate : function(){
      // Get the project id from the hidden input.
      var iterationIdInput = document.querySelector('input[name="iteration-id"]');

      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        fecha_fin : this.newIterationDate,
        idSprint : iterationIdInput.value,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the projects list.
      fetch('/editarSprint', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          SuccessToast(response.result);
          var sprint = this.iteration;
          sprint.fecha_fin = this.newIterationDate;
          this.iteration = sprint;
        }else{
          WarningToast(response.result);
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>
            {{ project.nombreProyecto }} - 
            Iteración {{ iteration.numeroSprint }}
          </b>
        </span>
        <div class="row">
          <div class="col s12 m8">
            <span class="title col s12" style="word-break: break-all;">
              Fecha de inicio: {{ iteration.fecha_inicio }}
            </span>
            <span class="title col s12" style="word-break: break-all;">
              Fecha de término: {{ iteration.fecha_fin }}
            </span>
          </div>
          <div class="col s12 m4">
            <input id="new-iteration-datepicker" 
              type="hidden" class="datepicker"/>
            <button title="Editar fecha de término"
              class="btn-floating btn-large remove-button-background right"
              @click="openDatePicker">
              <i class="material-icons">mode_edit</i>
            </button>
            </div>
          </div>
        </div>
      </div>
  `
});