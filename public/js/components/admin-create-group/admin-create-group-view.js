Vue.component('admin-create-group-view', {
  data : function(){
    return {
      newGroupDescription : '',
      hasValidFields : false,
      newLeaderId : null,
      newMemberIds : [],
      newGroupName : '',
      users : []
    };
  },
  created : function(){
    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the user list.
    fetch('/obtenerUsuariosActivos', requestData)
    .then(response => response.json())
    .then(function(response){
      console.log(response);
      if(response.status === 'OK'){
        this.users = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
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
    handleGroupSubmitted : function(){
      if(this.newMemberIds.length === 0){
        WarningToast(
          'Agrega al menos un usuario' +
          ' al grupo.'
        );
        return;
      }
      if(this.newLeaderId === null){
        WarningToast(
          'Elige un líder de grupo' +
          ' para continuar.'
        );
        return;
      }
      this.hasValidFields = false;
      $('#new-group-info-form').submit();
      if(!this.hasValidFields){
        WarningToast(
          'Revisa la información' +
          ' del grupo.'
        );
        return;
      }

      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        descripcion : this.newGroupDescription,
        nombreGrupo : this.newGroupName,
        integrantes : this.newMemberIds,
        lider : this.newLeaderId,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the groups list.
      fetch('/agregarGrupo', requestData)
      .then(response => response.json())
      .then(function(response){
        console.log(response);
        if(response.status === 'OK'){
          SuccessToast(response.result);
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));

      this.resetInformation();
    },
    resetInformation : function(){
      this.newGroupDescription = '';
      this.newGroupName = '';
      this.newLeaderId = null;
      this.newMemberIds = [];
      document.querySelector('#new-group-info-form').reset();
      M.updateTextFields();
    }
  },
  mounted : function(){
    M.updateTextFields();
    // TODO : No JQuery.
    $('#new-group-info-form').validate({
      rules : {
        'new-group-name-input' : {
          required: true
        },
        'new-group-desc-input' : {
          required: true
        }
      },
      messages : {
        'new-group-name-input' : {
          required : 'Ingresa un nombre de grupo.'
        },
        'new-group-desc-input' : {
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
            <b>Información básica del grupo</b>
          </span>
          <div class="row">
            <form class="col s12" id="new-group-info-form">
              <div class="row">
                <div class="input-field col s12">
                  <input class="validate" type="text" 
                    placeholder="Nombre del Grupo" 
                    name="new-group-name-input"
                    id="new-group-name-input" 
                    v-model:value="newGroupName" />
                  <label for="new-group-name-input">
                    Nombre del Grupo
                  </label>
                </div>
                <div class="input-field col s12">
                  <textarea class="materialize-textarea"
                    name="new-group-desc-input"
                    id="new-group-desc-input"
                    v-model:value="newGroupDescription"></textarea>
                  <label for="new-group-desc-input">
                    Descripción del Grupo
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
        @group-submitted="handleGroupSubmitted"
        :group-members="memberList"
        :leader-id="newLeaderId">
      </new-leader-modal>
      <div class="row">
        <button data-target="new-leader-modal" 
          class="btn modal-trigger remove-button-background right">
          Seleccionar Líder
        </button>
      </div>
      <chat-sidenav-view>
      </chat-sidenav-view>
    </div>
  `
});