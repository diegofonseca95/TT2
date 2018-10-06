Vue.component('new-leader-modal', {
  props : ['groupMembers', 'leaderId'],
  methods : {
    handleNewLeader : function(userId){
      this.$emit('new-leader-chosen', userId);
    }
  },
  template : `
    <div class="modal modal-fixed-footer" id="new-leader-modal">
      <div class="modal-content">
        <div class="row">
          <new-leader-list
            @new-leader-chosen="handleNewLeader($event)"
            :group-members="groupMembers"
            :leader-id="leaderId">
          </new-leader-list>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">
          Cancelar
        </a>
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">
          Crear proyecto
        </a>
      </div>
    </div>
  `
});