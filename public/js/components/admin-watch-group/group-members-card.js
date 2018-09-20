Vue.component('group-members-card', {
  props : ['groupMembers','users'],
  data : function(){
    return {
      displayedUserId : null
    };
  },
  methods : {
    handleMemberSelected : function(userId){
      this.displayedUserId = userId;
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>Usuarios</b>
        </span>
        <group-member-list
          @member-selected="handleMemberSelected($event)"
          :group-members="groupMembers">
        </group-member-list>
        <div class="row">
          <div class="col s12">
            <button class="btn-floating btn-large modal-trigger remove-button-background right"
              data-target="add-new-member-modal" title="Agregar usuarios">
              <i class="material-icons">add</i>
            </button>
          </div>
        </div>
      </div>
      <add-new-member-modal
        :users="users">
      </add-new-member-modal>
      <user-info-modal
        :user-id="displayedUserId">
      </user-info-modal>
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