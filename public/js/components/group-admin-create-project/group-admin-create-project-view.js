Vue.component('group-admin-create-project-view', {
  data : function(){
    return {
      newProjectDescription : '',
      newProjectName : '',
      newMemberList : [],
      newLeaderId : null,
      users : [],
      hasValidFields : false
    };
  },
  computed : {
    canSubmit : function(){
      return this.hasValidFields && this.newLeaderId !== null;
    }
  },
  methods : {
    handleLeaderChosen : function(userId){
      this.newLeaderId = userId;
    },
    handleRemoveNewMember : function(userId){
      this.newMemberList = this.newMemberList.filter(id => {
        return id !== userId;
      });
    },
    handleAddNewMember : function(userId){
      if(!this.newMemberList.includes(userId)){
        this.newMemberList.push(userId);
      }
    },
    handleGroupSubmit : function(){
      
    }
  },
  mounted : function(){
    // TODO : No JQuery.
    $('#edit-group-info-form').validate({
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
        :users="users">
      </add-new-member-card>
      <new-leader-modal
        @new-leader-chosen="handleLeaderChosen($event)"
        :leader-id="newLeaderId"
        :group-members="users">
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