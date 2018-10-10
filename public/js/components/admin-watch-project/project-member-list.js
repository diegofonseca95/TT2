Vue.component('project-member-list', {
  props : ['projectMembers'],
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
      <project-member-list-item 
        v-for="member in projectMembers" 
        @member-selected="handleMemberSelected($event)"
        @member-removed="handleMemberRemoved($event)"
        :key="member.idUsuario"
        :member="member">
      </project-member-list-item>
      <li class="collection-item"
        v-if="projectMembers.length === 0">
        No hay miembros en el grupo.
      </li>
    </ul>
  `
});