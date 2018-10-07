Vue.component('group-admin-create-project-view', {
  data : function(){
    return {
      newProjectDescription : '',
      hasValidFields : false,
      newProjectName : '',
      newLeaderId : null,
      newMemberIds : [],
      users : [
        {
          idUsuario : 0,
          nombre : 'Vanesa',
          apellidoPaterno : 'Romero',
          apellidoMaterno : 'Sanchez'
        },
        {
          idUsuario : 1,
          nombre : 'Victor Alberto',
          apellidoPaterno : 'Noriega',
          apellidoMaterno : 'Morales'
        }
      ]
    };
  },
  computed : {
    memberList : function(){
      return this.users.filter(
        user => this.newMemberIds.includes(user.idUsuario)
      );
    }
  },
  methods : {
    handleLeaderChosen : function(userId){
      this.newLeaderId = userId;
    },
    handleRemoveNewMember : function(userId){
      this.newMemberIds = this.newMemberIds.filter(id => {
        return id !== userId;
      });
    },
    handleAddNewMember : function(userId){
      if(!this.newMemberIds.includes(userId)){
        this.newMemberIds.push(userId);
      }
    },
    handleProjectSubmitted : function(){
      if(this.newMemberIds.length === 0){
        WarningToast(
          'Agrega al menos un usuario' +
          ' al proyecto.'
        );
        return;
      }
      if(this.newLeaderId === null){
        WarningToast(
          'Elige un líder de proyecto' +
          ' para continuar.'
        );
        return;
      }
      this.hasValidFields = false;
      $('#new-project-info-form').submit();
      if(!this.hasValidFields){
        WarningToast(
          'Revisa la información' +
          ' del proyecto.'
        );
        return;
      }
      console.log({
        descripcion : this.newProjectDescription,
        nombreProyecto : this.newProjectName,
        miembros : this.newMemberIds,
        idLider : this.newLeaderId
      });
      this.resetInformation();
    },
    resetInformation : function(){
      this.newProjectDescription = '';
      this.newProjectName = '';
      this.newLeaderId = null;
      this.newMemberIds = [];
      document.querySelector('#new-project-info-form').reset();
      M.updateTextFields();
    }
  },
  mounted : function(){
    // TODO : No JQuery.
    $('#new-project-info-form').validate({
      rules : {
        'new-project-name-input' : {
          required: true
        },
        'new-project-desc-input' : {
          required: true
        }
      },
      messages : {
        'new-project-name-input' : {
          required : 'Ingresa un nombre de grupo.'
        },
        'new-project-desc-input' : {
          required : 'Ingresa una descripción.'
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
  template : `
    <div class="row">
      <div class="card">
        <div class="card-content">
          <span class="card-title first-text">
            <b>Información básica del proyecto</b>
          </span>
          <div class="row">
            <form class="col s12" id="new-project-info-form">
              <div class="row">
                <div class="input-field col s12">
                  <input class="validate" type="text" 
                    placeholder="Nombre del Proyecto" 
                    name="new-project-name-input"
                    id="new-project-name-input" 
                    v-model:value="newProjectName" />
                  <label for="new-project-name-input">
                    Nombre del Proyecto
                  </label>
                </div>
                <div class="input-field col s12">
                  <textarea class="materialize-textarea"
                    name="new-project-desc-input"
                    id="new-project-desc-input"
                    v-model:value="newProjectDescription"></textarea>
                  <label for="new-project-desc-input">
                    Descripción del Proyecto
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <add-new-member-card 
        @remove-new-member="handleRemoveNewMember($event)"
        @add-new-member="handleAddNewMember($event)"
        :member-ids="newMemberIds"
        :users="users">
      </add-new-member-card>
      <new-leader-modal
        @new-leader-chosen="handleLeaderChosen($event)"
        @project-submitted="handleProjectSubmitted"
        :group-members="memberList"
        :leader-id="newLeaderId">
      </new-leader-modal>
      <div class="row">
        <button data-target="new-leader-modal" 
          class="btn modal-trigger remove-button-background right">
          Seleccionar Líder
        </button>
      </div>
    </div>
  `
});