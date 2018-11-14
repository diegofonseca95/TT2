Vue.component('group-member-list', {
  props : [
    'groupMembers',
    'permissions'
  ],
  data : function(){
    return {};
  },
  methods : {
    handleMemberSelected : function(user){
      this.$emit('member-selected', user);
    },
    handleMemberRemoved : function(user){
      this.$emit('member-removed', user);
    }
  },
  template : `
    <ul class="collection scrollable-collection">
      <group-member-list-item 
        v-for="member in groupMembers" 
        @member-selected="handleMemberSelected($event)"
        @member-removed="handleMemberRemoved($event)"
        :permissions="permissions"
        :key="member.idUsuario"
        :member="member">
      </group-member-list-item>
      <li class="collection-item"
        v-if="groupMembers.length === 0">
        No hay miembros en el grupo.
      </li>
    </ul>
  `
});