Vue.component('group-member-list', {
  props : ['groupMembers'],
  data : function(){
    return {};
  },
  methods : {
    handleMemberSelected : function(user){
      this.$emit('member-selected', user);
    }
  },
  template : `
    <ul class="collection scrollable-collection">
      <group-member-list-item 
        v-for="member in groupMembers" 
        @member-selected="handleMemberSelected($event)"
        :key="member.idUsuario"
        :member="member">
      </group-member-list-item>
    </ul>
  `
});

/*
<ul class="collection scrollable-collection">
  <group-member-list-item 
    v-for="member in groupMembers" 
    :key="member.idUsuario" 
    :member="member">
  </group-member-list-item>
</ul>
*/