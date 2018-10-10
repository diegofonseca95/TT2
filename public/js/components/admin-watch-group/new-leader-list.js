Vue.component('new-leader-list', {
  props : ['groupMembers','leaderId'],
  data : function(){
    return {};
  },
  methods : {
    handleNewLeader : function(userId){
      this.$emit('new-leader-chosen', userId);
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>Seleccionar líder</b>
        </span>
        <ul class="collection">
          <new-leader-list-item
            v-for="member in groupMembers"
            @new-leader-chosen="handleNewLeader($event)"
            :is-checked="leaderId === member.idUsuario"
            :key="member.idUsuario"
            :member="member">
          </new-leader-list-item>
          <li class="collection-item"
            v-if="groupMembers.length === 0">
            No hay miembros en el grupo.
          </li>
        </ul>
      </div>
    </div>
  `
});