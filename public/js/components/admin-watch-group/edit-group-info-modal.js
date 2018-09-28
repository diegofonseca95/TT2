Vue.component('edit-group-info-modal', {
  props : ['groupInfo','groupMembers'],
  data : function(){
    return {
      newGroupDescription : '',
      newLeaderId : null,
      newGroupName : ''
    };
  },
  methods : {
    handleLeaderChosen : function(userId){
      this.newLeaderId = userId;
    },
    handleModalClose : function(){
      // TODO : Submit info.
      // TODO : Trigger group-info-updated event on edit success.
      if(this.newLeaderId === null){
        return;
      }
      this.$emit('group-info-updated', {
        description : this.newGroupDescription,
        leaderId : this.newLeaderId,
        name : this.newGroupName
      }); // Only do on success.
    }
  },
  watch : {
    groupInfo : function(){
      this.newGroupDescription = this.groupInfo.description;
      this.newLeaderId = this.groupInfo.leader.idUsuario;
      this.newGroupName = this.groupInfo.name;
    }
  },
  template : `
    <div id="edit-group-info-modal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Editar información del grupo</h4>
        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input class="validate" id="edit-group-info-modal-name-input" type="text" 
                  placeholder="Nombre del grupo" v-model:value="newGroupName" />
                <label for="edit-group-info-modal-name-input">Nombre del grupo</label>
              </div>
              <div class="input-field col s12">
                <input class="validate" id="edit-group-info-modal-desc-input" type="text" 
                  placeholder="Descripción del grupo" v-model:value="newGroupDescription" />
                <label for="edit-group-info-modal-desc-input">Descripción del grupo</label>
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
        <a class="modal-close waves-effect waves-green btn-flat" 
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