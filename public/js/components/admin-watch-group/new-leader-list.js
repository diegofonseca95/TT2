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
        <form action="#">
          <ul class="collection">
            <new-leader-list-item
              v-for="member in groupMembers"
              @new-leader-chosen="handleNewLeader($event)"
              :is-checked="leaderId === member.idUsuario"
              :key="member.idUsuario"
              :member="member">
            </new-leader-list-item>
          </ul>
        </form>
      </div>
    </div>
  `
});

/*
<!-- Group Users Begin -->
<div class="card">
  <div class="card-content">
    <span class="card-title first-text">
      <b>Seleccionar líder</b>
    </span>
    <form action="#">
      <ul class="collection">
      <!-- User Begins -->
      <new-leader-list-item
        v-for="user in users"
        :user="user">
      </new-leader-list-item>
      <!-- User Ends -->
      </ul>
    </form>
  </div>
</div>
<!-- Group Users End -->
*/