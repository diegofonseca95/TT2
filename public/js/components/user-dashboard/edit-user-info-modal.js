const EditUserInfoModalValidateSettings = {
  rules : {
    'edit-user-info-modal-password-input' : {
      required: true,
      minlength: 8,
      maxlength: 20
    },
    'edit-user-info-modal-newpass-input' : {
    },
    'edit-user-info-modal-confirm-input' : {
      equalTo: "#edit-user-info-modal-newpass-input"
    },
    'edit-user-info-modal-flast-input' : {
      required: true,
      maxlength: 100
    },
    'edit-user-info-modal-mlast-input' : {
      required: true,
      maxlength: 100
    },
    'edit-user-info-modal-email-input' : {
      required: true,
      maxlength: 256,
      email: true
    },
    'edit-user-info-modal-name-input' : {
      required: true,
      maxlength: 100
    },
    'edit-user-info-modal-phone' : {
      required: true,
      maxlength: 45
    }
  },
  messages : {
    'edit-user-info-modal-password-input' : {
      required: 'Ingresa tu contraseña actual.',
      minlength: 'La contraseña debe tener al menos 8 caracteres.',
      maxlength: 'La contraseña debe tener a lo más 20 caracteres.'
    },
    'edit-user-info-modal-newpass-input' : {
    },
    'edit-user-info-modal-confirm-input' : {
      equalTo: 'La confirmación de la nueva contraseña no coincide con la nueva contraseña.'
    },
    'edit-user-info-modal-flast-input' : {
      required: 'Ingresa tu Apellido Paterno.',
      maxlength: 'La longitud máxima posible es de 100 caracteres.'
    },
    'edit-user-info-modal-mlast-input' : {
      required: 'Ingresa tu Apellido Materno.',
      maxlength: 'La longitud máxima posible es de 100 caracteres.'
    },
    'edit-user-info-modal-email-input' : {
      required: 'Ingresa tu Correo.',
      maxlength: 'La longitud máxima posible es de 256 caracteres.',
      email: 'Favor de ingresar texto con formato de correo válido'
    },
    'edit-user-info-modal-name-input' : {
      required: 'Ingresa tu Nombre.',
      maxlength: 'La longitud máxima posible es de 100 caracteres.'
    },
    'edit-user-info-modal-phone' : {
      required: 'Ingresa tu Teléfono.',
      maxlength: 'La longitud máxima posible es de 45 caracteres.'
    }
  },
  errorElement : 'div',
  errorPlacement : function(error, element){
    $(error).addClass('error-text');
    error.insertAfter(element);
  }
};

Vue.component('edit-user-info-modal', {
  props : ['user'],
  data : function(){
    return {
      newFathersLastname : this.user.apellidoPaterno,
      newMothersLastname : this.user.apellidoMaterno,
      newPhone : this.user.telefono,
      newMail : this.user.correo,
      newName : this.user.nombre,
      newPasswordMatch : '',
      currentPassword : '',
      newPassword : '',
      hasValidFields : false
    };
  },
  mounted : function(){
    M.Modal.init(
      document.querySelector('#edit-user-info-modal')
    );
    // TODO : No JQuery.
    var formSettings = EditUserInfoModalValidateSettings;
    formSettings.submitHandler = function(form){
      this.hasValidFields = true;
    }.bind(this);
    $('#edit-user-info-form').validate(formSettings);
  },
  methods : {
    handleEditInfo : function(){
      this.hasValidFields = false;
      $('#edit-user-info-form').submit();
      if(this.hasValidFields){
        this.submitNewInfo();
      }
    },
    submitNewInfo : function(){
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        apellidoPaterno : this.newFathersLastname,
        apellidoMaterno : this.newMothersLastname,
        nuevacontrasenar : this.newPasswordMatch,
        nuevacontrasena : this.newPassword,
        contrasena : this.currentPassword,
        idUsuario : this.user.idUsuario,
        telefono : this.newPhone,
        correo : this.newMail,
        nombre : this.newName,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the user personal info.
      fetch('/editarUsuario', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          this.$emit('user-updated', response.usuario);
          M.Modal.getInstance(
            document.querySelector(
              '#edit-user-info-modal'
            )
          ).close();
          SuccessToast(response.result);
        }else{
          WarningToast(response.result);
        }
      }.bind(this));
    }
  },
  watch : {
    user : function(){
      this.newFathersLastname = this.user.apellidoPaterno;
      this.newMothersLastname = this.user.apellidoMaterno;
      this.newPhone = this.user.telefono;
      this.newMail = this.user.correo;
      this.newName = this.user.nombre;
      this.newPasswordMatch = '';
      this.currentPassword = '';
      this.newPassword = '';
    }
  },
  template : `
    <div class="modal modal-fixed-footer" id="edit-user-info-modal">
      <div class="modal-content">
        <h4>Ajustes de Usuario</h4>
        <form class="col s12" id="edit-user-info-form">
          <div class="row">
            <!-- User Basic Info Begins-->
            <div class="input-field col s12 m4">
              <input placeholder="Nombres" type="text" class="validate"
                name="edit-user-info-modal-name-input" 
                id="edit-user-info-modal-name-input" 
                v-model:value="newName" />
              <label for="edit-user-info-modal-name-input">
                Nombres
              </label>
            </div>
            <div class="input-field col s12 m4">
              <input placeholder="Apellido Paterno" type="text" class="validate"
                name="edit-user-info-modal-flast-input" 
                id="edit-user-info-modal-flast-input" 
                v-model:value="newFathersLastname" />
              <label for="edit-user-info-modal-flast-input">
                Apellido Paterno
              </label>
            </div>
            <div class="input-field col s12 m4">
              <input placeholder="Apellido Materno" type="text" class="validate"
                name="edit-user-info-modal-mlast-input" 
                id="edit-user-info-modal-mlast-input" 
                v-model:value="newMothersLastname" />
              <label for="edit-user-info-modal-mlast-input">
                Apellido Materno
              </label>
            </div>
            <div class="input-field col s12">
              <input placeholder="Correo Electrónico" type="text" class="validate"
                name="edit-user-info-modal-email-input" 
                id="edit-user-info-modal-email-input" 
                v-model:value="newMail" />
              <label for="edit-user-info-modal-email-input">
                Correo Electrónico
              </label>
            </div>
            <div class="input-field col s12">
              <input placeholder="Número Telefónico" type="text" class="validate"
                name="edit-user-info-modal-phone" 
                id="edit-user-info-modal-phone" 
                v-model:value="newPhone" />
              <label for="edit-user-info-modal-phone-input">
                Número Telefónico
              </label>
            </div>
            <!-- User Basic Info Ends -->
            <!-- User Password Info Begins -->
            <div class="input-field col s12 m4">
              <input placeholder="Contraseña Actual" type="password" class="validate" 
                name="edit-user-info-modal-password-input" 
                id="edit-user-info-modal-password-input" 
                v-model:value="currentPassword" />
              <label for="edit-user-info-modal-password-input">
                Contraseña Actual
              </label>
            </div>
            <div class="input-field col s12 m4">
              <input placeholder="Nueva Contraseña" type="password" class="validate" 
                name="edit-user-info-modal-newpass-input" 
                id="edit-user-info-modal-newpass-input" 
                v-model:value="newPassword" />
              <label for="edit-user-info-modal-newpass-input">
                Nueva Contraseña
              </label>
            </div>
            <div class="input-field col s12 m4">
              <input placeholder="Repetir Nueva Contraseña"  type="password" class="validate" 
                name="edit-user-info-modal-confirm-input" 
                id="edit-user-info-modal-confirm-input" 
                v-model:value="newPasswordMatch" />
              <label for="edit-user-info-modal-confirm-input">
                Repetir Nueva Contraseña
              </label>
            </div>
            <!-- User Password Info Ends -->
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn-flat" 
          href="#!">
          Cancelar
        </a>
        <a class="waves-effect waves-green btn-flat"
          href="#!" @click="handleEditInfo">
          Aplicar Cambios
        </a>
      </div>
    </div>
  `
});