Vue.component('new-chat-member-list', {
  props : ['users','selectedBucket'],
  data : function(){
    return {
      searchInput : ''
    };
  },
  computed : {
    filteredList : function(){
      const tokens = this.searchInput.split(' ').filter(Boolean);
      return this.users.filter(function(user){
        if(this.selectedBucket[user.idUsuario]){
          return true;
        }
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
      }.bind(this));
    },
    anyUserMatches : function(){
      return this.filteredList.length === 0 
        && this.searchInput !== ''
        && this.users.length > 0;
    }
  },
  methods : {
    handleRemoveNewMember : function(userId){
      this.$emit('remove-new-member', userId);
    },
    handleAddNewMember : function(userId){
      this.$emit('add-new-member', userId);
    }
  },
  template : `
    <div class="row">
      <form class="col s12">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <div class='input-field col s12'>
                <i class='material-icons prefix third-text'>search</i>
                <input placeholder='Ingresa palabras clave.' 
                  id="new-chat-member-list-search-input"
                  type='text' class='validate'
                  v-model:value="searchInput" />
                <label for="new-chat-member-list-search-input">
                  Búsqueda de Usuarios
                </label>
              </div>
            </div>
            <ul class="collection scrollable-collection">
              <new-chat-member-list-item
                v-for="user in filteredList"
                :selected="selectedBucket[user.idUsuario]"
                @remove-new-member="handleRemoveNewMember"
                @add-new-member="handleAddNewMember"
                :key="user.idUsuario"
                :user="user">
              </new-chat-member-list-item>
              <li class="collection-item"
                v-if="users.length === 0">
                No hay usuarios disponibles para seleccionar.
              </li>
              <li class="collection-item"
                v-if="anyUserMatches">
                Ningún usuario coincide con la busqueda
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  `
});