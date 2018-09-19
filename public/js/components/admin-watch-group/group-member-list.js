Vue.component('group-member-list', {
  props : ['groupMembers'],
  data : function(){
    return {};
  },
  template : `
    <ul class="collection scrollable-collection">
      <group-member-list-item 
        v-for="member in groupMembers" 
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