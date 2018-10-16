Vue.component('task-user-list', {
  props : ['projectMembers'],
  data : function(){
    return {
      searchInput : ''
    };
  },
  computed : {
    filteredList : function(){
      const tokens = this.searchInput.split(' ').filter(Boolean);
      return this.projectMembers.filter(function(user){
        if(tokens.length == 0){
          return true;
        }
        for(var i in tokens){
          const token = tokens[i];
          for(var key in user){
            if(typeof user[key] === 'string'){
              if(user[key].includes(token)){
                return true;
              }
            }
          }
        }
        return false;
      });
    },
    anyUserMatches : function(){
      return this.filteredList.length === 0 
        && this.searchInput !== ''
        && this.projectMembers.length > 0;
    }
  },
  methods : {
    handleTaskUserChosen : function(user){
      this.$emit('task-user-chosen', user);
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <div class="row">
          <div class='input-field col s12'>
            <i class='material-icons prefix third-text'>search</i>
            <input placeholder='Ingresa palabras clave.' 
              type='text' class='validate'
              v-model:value="searchInput" />
            <label>Búsqueda de Usuarios</label>
          </div>
        </div>
        <ul class="collection">
          <task-user-list-item
            v-for="member in filteredList"
            @task-user-chosen="handleTaskUserChosen($event)"
            :key="member.idUsuario"
            :member="member">
          </task-user-list-item>
          <li class="collection-item"
            v-if="projectMembers.length === 0">
            No hay miembros en el proyecto.
          </li>
          <li class="collection-item"
            v-if="anyUserMatches">
            Ningún usuario coincide con la búsqueda.
          </li>
        </ul>
      </div>
    </div>
  `
});