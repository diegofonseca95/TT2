Vue.component('group-members-card', {
  props : [
    'groupMembers',
    'permissions',
    'users'
  ],
  data : function(){
    return {
      displayedUser : {}
    };
  },
  methods : {
    handleMemberSelected : function(selectedUser){
      this.displayedUser = selectedUser;
    },
    handleMemberRemoved : function(user){
      this.$emit('member-removed', user);
    },
    handleNewMembersAdded : function(memberList){
      this.$emit('new-members-added', memberList);
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
          @member-removed="handleMemberRemoved($event)"
          :group-members="groupMembers"
          :permissions="permissions">
        </group-member-list>
        <div class="row" v-if="permissions.eliminar">
          <div class="col s12">
            <button class="btn-floating btn-large modal-trigger remove-button-background right"
              data-target="add-new-member-modal" title="Agregar usuarios">
              <i class="material-icons">add</i>
            </button>
          </div>
        </div>
      </div>
      <add-new-member-modal
        @new-members-added="handleNewMembersAdded"
        v-if="permissions.eliminar"
        :users="users">
      </add-new-member-modal>
      <user-info-modal :user="displayedUser">
      </user-info-modal>
    </div>
  `
});