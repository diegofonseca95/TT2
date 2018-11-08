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
      newPassword : ''
    };
  },
  mounted : function(){
    M.Modal.init(
      document.querySelector('#edit-user-info-modal')
    );
    // TODO : No JQuery.
    $('#edit-user-info-form').validate({
      rules : {
        'edit-user-info-modal-password-input' : {
          required: true
        },
        'edit-user-info-modal-newpass-input' : {
        },
        'edit-user-info-modal-confirm-input' : {
        },
        'edit-user-info-modal-flast-input' : {
          required: true
        },
        'edit-user-info-modal-mlast-input' : {
          required: true
        },
        'edit-user-info-modal-email-input' : {
          required: true
        },
        'edit-user-info-modal-name-input' : {
          required: true
        },
        'edit-user-info-modal-phone' : {
          required: true
        }
      },
      messages : {
        'edit-user-info-modal-password-input' : {
          required: 'Ingresa tu contraseña actual.'
        },
        'edit-user-info-modal-newpass-input' : {
        },
        'edit-user-info-modal-confirm-input' : {
        },
        'edit-user-info-modal-flast-input' : {
          required: 'Ingresa tu Apellido Paterno.'
        },
        'edit-user-info-modal-mlast-input' : {
          required: 'Ingresa tu Apellido Materno.'
        },
        'edit-user-info-modal-email-input' : {
          required: 'Ingresa tu Correo.'
        },
        'edit-user-info-modal-name-input' : {
          required: 'Ingresa tu Nombre.'
        },
        'edit-user-info-modal-phone' : {
          required: 'Ingresa tu Teléfono.'
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
    handleEditInfo : function(){
      // TODO : Submit form.
      $('#edit-user-info-form').submit();
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
                v-model:value="newName" />
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