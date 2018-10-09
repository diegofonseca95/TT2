Vue.component('edit-group-info-modal', {
  props : ['groupInfo','groupMembers'],
  data : function(){
    return {
      newGroupDescription : '',
      newLeaderId : null,
      newGroupName : '',
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
      this.hasValidFields = true;
      // TODO : Work around to avoid JQuery.
      //$('#edit-group-info-form').submit();
      if(this.canSubmit){
        var modal = document.querySelector('#edit-group-info-modal');
        M.Modal.getInstance(modal).close();
        this.$emit('group-info-updated', {
          description : this.newGroupDescription,
          leaderId : this.newLeaderId,
          name : this.newGroupName
        }); // Only do on success.
      }
    }
  },
  watch : {
    groupInfo : function(){
      this.newGroupDescription = this.groupInfo.description;
      this.newLeaderId = this.groupInfo.leader.idUsuario;
      this.newGroupName = this.groupInfo.name;
    }
  },
  mounted : function(){
    // TODO : No JQuery.
    /*
    $('#edit-group-info-form').validate({
      rules : {
        'edit-group-info-modal-name-input' : {
          required: true
        },
        'edit-group-info-modal-desc-input' : {
          required: true
        }
      },
      messages : {
        'edit-group-info-modal-name-input' : {
          required : 'Ingresa un nombre de grupo.'
        },
        'edit-group-info-modal-desc-input' : {
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
    });*/
  },
  template : `
    <div id="edit-group-info-modal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Editar información del grupo</h4>
        <div class="row">
          <form class="col s12" id="edit-group-info-form">
            <div class="row">
              <div class="input-field col s12">
                <input class="validate" name="edit-group-info-modal-name-input" 
                  id="edit-group-info-modal-name-input" type="text" 
                  placeholder="Nombre del grupo" 
                  v-model:value="newGroupName" />
                <label for="edit-group-info-modal-name-input">
                  Nombre del grupo
                </label>
              </div>
              <div class="input-field col s12">
                <input class="validate" name="edit-group-info-modal-desc-input"
                  id="edit-group-info-modal-desc-input" type="text" 
                  placeholder="Descripción del grupo"
                  v-model:value="newGroupDescription" />
                <label for="edit-group-info-modal-desc-input">
                  Descripción del grupo
                </label>
              </div>
            </div>
            <new-leader-list
              :group-members="groupMembers"
              :leader-id="newLeaderId"
              @new-leader-chosen="handleLeaderChosen($event)">
            </new-leader-list>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <a class="waves-effect waves-green btn-flat" 
          href="#!" @click="handleModalClose">
          Listo
        </a>
      </div>
    </div>
  `
});

/*
<!-- Group Modal Definition Begins -->
<div id="modal_groupInfo" class="modal modal-fixed-footer">
  <div class="modal-content">
    <h4>Editar información del grupo</h4>
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="Nombre del grupo" value="Nombre del grupo" id="edit-group-info-modal-name-input" type="text" class="validate">
            <label for="edit-group-info-modal-name-input">Nombre del grupo</label>
          </div>
          <div class="input-field col s12">
            <input placeholder="Descripción del grupo" value="Descripción del grupo" id="edit-group-info-modal-desc-input" type="text"
            class="validate">
            <label for="edit-group-info-modal-desc-input">Descripción del grupo</label>
          </div>
        </div>
        <new-leader-list
          :group-members="users"
          @new-leader-chosen="alert($event)">
        </new-leader-list>
      </form>
    </div>
  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Listo</a>
  </div>
</div>
<!-- Group Modal Definition Ends-->
*/