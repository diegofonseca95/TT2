const NewIterationCardDatepickerOptions = {
  format: "dd / mmm / yyyy",
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
      newIterationDescription : '',
      hasValidFields : false
    };
  },
  mounted : function(){
    // Initialize datepicker.
    M.Datepicker.init(
      document.querySelector('#new-iteration-date-input'), 
      NewIterationCardDatepickerOptions
    );
    // TODO : No JQuery
    $('#new-iteration-form').validate({
      rules : {
        'new-iteration-description-input' : {
          required : true
        }
      },
      messages : {
        'new-iteration-description-input' : {
          required : 'Ingresa la descripción de la iteración.'
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
    handleIterationCreation : function(){
      this.hasValidFields = false;
      $('#new-iteration-form').submit();
      if(this.hasValidFields){
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
        console.log(this.newIterationDescription);
        console.log(datepicker.value);
        this.resetInformation();
      }
    },
    resetInformation : function(){
      this.newIterationDescription = '';
      document.querySelector('#new-iteration-form').reset();
      M.textareaAutoResize(
        document.querySelector('#new-iteration-description-input')
      );
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
          <form class="col s12" id="new-iteration-form">
            <div class="row">
              <div class="input-field col s9">
                <textarea class="materialize-textarea"
                  placeholder="Descripción de la Iteración" 
                  name="new-iteration-description-input"
                  id="new-iteration-description-input"
                  v-model:value="newIterationDescription"></textarea>
                <label for="new-iteration-description-input">
                  Descripción de la Iteración
                </label>
              </div>
              <div class="input-field col s3">
                <input class="datepicker" type="text" 
                  name="new-iteration-date-input"
                  id="new-iteration-date-input"/>
                <label for="new-iteration-date-input">
                  Fecha de término
                </label>
              </div>
            </div>
          </form>
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