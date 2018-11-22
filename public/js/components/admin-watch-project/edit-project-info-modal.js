const EditProjectInfoModalValidateSettings = {
  rules : {
    'edit-project-info-modal-name-input' : {
      required: true
    },
    'edit-project-info-modal-desc-input' : {
    }
  },
  messages : {
    'edit-project-info-modal-name-input' : {
      required : 'Ingresa un nombre de proyecto.'
    },
    'edit-project-info-modal-desc-input' : {
    }
  },
  errorElement : 'div',
  errorPlacement : function(error, element){
    $(error).addClass('error-text');
    error.insertAfter(element);
  }
};

Vue.component('edit-project-info-modal', {
  props : ['projectInfo','projectMembers'],
  data : function(){
    return {
      newProjectDescription : this.projectInfo.description,
      newLeaderId : this.projectInfo.leader.idUsuario,
      newProjectName : this.projectInfo.name,
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
    handleModalClose : function(){
      this.hasValidFields = false;
      // TODO : Work around to avoid JQuery.
      $('#edit-project-info-form').submit();
      if(this.canSubmit){
        var modal = document.querySelector('#edit-project-info-modal');
        M.Modal.getInstance(modal).close();
        this.$emit('project-info-updated', {
          description : this.newProjectDescription,
          leaderId : this.newLeaderId,
          name : this.newProjectName
        }); // Only do on success.
      }
    }
  },
  watch : {
    projectInfo : function(){
      this.newProjectDescription = this.projectInfo.description;
      this.newLeaderId = this.projectInfo.leader.idUsuario;
      this.newProjectName = this.projectInfo.name;
      M.updateTextFields();
    }
  },
  mounted : function(){
    var elems = document.querySelector('#edit-project-info-modal');
    var instances = M.Modal.init(elems);
    M.updateTextFields();
    // TODO : No JQuery.
    var formSettings = EditProjectInfoModalValidateSettings;
    formSettings.submitHandler = function(form){
      this.hasValidFields = true;
    }.bind(this);
    $('#edit-project-info-form').validate(formSettings);
  },
  template : `
    <div id="edit-project-info-modal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Editar información del proyecto</h4>
        <div class="row">
          <form class="col s12" id="edit-project-info-form">
            <div class="row">
              <div class="input-field col s12">
                <input class="validate" name="edit-project-info-modal-name-input" 
                  id="edit-project-info-modal-name-input" type="text" 
                  placeholder="Nombre del proyecto" 
                  v-model:value="newProjectName" />
                <label for="edit-project-info-modal-name-input">
                  Nombre del proyecto
                </label>
              </div>
              <div class="input-field col s12">
                <input class="validate" name="edit-project-info-modal-desc-input"
                  id="edit-project-info-modal-desc-input" type="text" 
                  placeholder="Descripción del proyecto"
                  v-model:value="newProjectDescription" />
                <label for="edit-project-info-modal-desc-input">
                  Descripción del proyecto
                </label>
              </div>
            </div>
            <new-leader-list
              :group-members="projectMembers"
              :leader-id="newLeaderId"
              @new-leader-chosen="handleLeaderChosen($event)">
            </new-leader-list>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">
          Cancelar
        </a>
        <a class="waves-effect waves-green btn-flat" 
          href="#!" @click="handleModalClose">
          Listo
        </a>
      </div>
    </div>
  `
});