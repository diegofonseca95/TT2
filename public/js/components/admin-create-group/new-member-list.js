/*
  This component represents the list of users 
  available to add to a new group.
*/
Vue.component('new-member-list', {
  props : [
    'selectedBucket', // A map to check if a given user is selected.
    'users' // The list of users that belong to the group.
  ],
  data : function(){
    return {
      searchInput : '' // The pattern to match in the user search.
    };
  },
  computed : {
    // The list of users that match the search pattern, if any.
    filteredList : function(){
      // Split the search pattern into tokens.
      const tokens = this.searchInput.split(' ').filter(Boolean);
      // Filter the users that match.
      return this.users.filter(function(user){
        // If the user is selected, include it,
        // even if it doesn't match.
        if(this.selectedBucket[user.idUsuario]){
          return true;
        }
        // If there is no search pattern, include the user.
        if(tokens.length == 0){
          return true;
        }
        // Check for all string fields in the user info for a match.
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
        // The user didn´t match any token in the pattern.
        return false;
      }.bind(this))
      // Place the selected users first.
      .sort(function(a, b){
        // If any of the users is selected, must go first.
        if(this.selectedBucket[a.idUsuario] === true)
          return -1; // Place 'a' before 'b'
        if(this.selectedBucket[b.idUsuario] === true)
          return +1; // Place 'b' before 'a'
        // Both users are selected.
        return 0;
      }.bind(this));
    },
    noUserMatches : function(){
      return this.filteredList.length === 0 
        && this.searchInput !== ''
        && this.users.length > 0;
    }
  },
  methods : {
    // Pass the remove-new-member event to the parent.
    handleRemoveNewMember : function(userId){
      this.$emit('remove-new-member', userId);
    },
    // Pass the add-new-member event to the parent.
    handleAddNewMember : function(userId){
      this.$emit('add-new-member', userId);
    }
  },
  template : `
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class='input-field col s12'>
            <i class='material-icons prefix third-text'>search</i>
            <input placeholder='Ingresa palabras clave.' 
              type='text' class='validate'
              v-model:value="searchInput" />
            <label>Búsqueda de Usuarios</label>
          </div>
        </div>
        <ul class="collection scrollable-collection">
          <new-member-list-item
            v-for="user in filteredList"
            :selected="selectedBucket[user.idUsuario]"
            @remove-new-member="handleRemoveNewMember"
            @add-new-member="handleAddNewMember"
            :key="user.idUsuario"
            :user="user">
          </new-member-list-item>
          <li class="collection-item"
            v-if="users.length === 0">
            No hay usuarios disponibles para seleccionar.
          </li>
          <li class="collection-item"
            v-if="noUserMatches">
            Ningún usuario coincide con la busqueda
          </li>
        </ul>
      </form>
    </div>
  `
});