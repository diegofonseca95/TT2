Vue.component('add-new-member-modal', {
  props : ['users'],
  data : function(){
    return {};
  },
  template : `
    <div id="add-new-member-modal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Agregar usuarios al grupo</h4>
        <new-member-list
          :users="users">
        </new-member-list>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">
          Listo
        </a>
      </div>
    </div>
  `
});

/*
<!-- Add User to Group Modal Definition Begins -->
<div id="modal_addUserToGroup" class="modal modal-fixed-footer">
  <div class="modal-content">
    <h4>Agregar usuarios al grupo</h4>
    <new-member-list :users="users">
    </new-member-list>
  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Listo</a>
  </div>
</div>
<!-- Add User to Group Modal Definition Ends-->
*/