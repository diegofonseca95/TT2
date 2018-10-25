Vue.component('new-leader-modal', {
  props : ['groupMembers', 'leaderId'],
  mounted : function(){
    M.Modal.init(document.querySelector('#new-leader-modal'));
  },
  methods : {
    handleNewLeader : function(userId){
      this.$emit('new-leader-chosen', userId);
    },
    handleGroupSubmitted : function(){
      this.$emit('group-submitted');
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
        <a class="modal-close waves-effect waves-green btn-flat"
          href="#!">
          Cancelar
        </a>
        <a class="modal-close waves-effect waves-green btn-flat"
          @click="handleGroupSubmitted"
          href="#!" >
          Crear grupo
        </a>
      </div>
    </div>
  `
});