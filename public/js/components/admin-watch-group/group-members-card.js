Vue.component('group-members-card', {
  props : ['groupMembers'],
  data : function(){
    return {};
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>Usuarios</b>
        </span>
        <group-member-list :group-members="groupMembers">
        </group-member-list>
        <div class="row">
          <div class="col s12">
            <button class="btn-floating btn-large modal-trigger remove-button-background right"
              data-target="modal_addUserToGroup" title="Agregar usuarios">
              <i class="material-icons">add</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
});

/*
<!-- Group Users Begin -->
<div class="card">
  <div class="card-content">
    <span class="card-title first-text">
      <b>Usuarios</b>
    </span>
    <group-member-list :group-members="users">
    </group-member-list>
    <div class="row">
      <div class="col s12">
        <button title="Agregar usuarios" data-target="modal_addUserToGroup" class="btn-floating btn-large modal-trigger remove-button-background right">
          <i class="material-icons">add</i>
        </button>
      </div>
    </div>
  </div>
</div>
<!-- Group Users End -->
*/