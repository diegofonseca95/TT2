/*
  This component represents the user list
  in the statistics view.
*/
Vue.component('statistics-user-list', {
  data : function(){
    return {
      searchInput : '', // The pattern to match in the user search.
      users : []        // The users information.
    };
  },
  beforeCreate : function(){
    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the user list.
    fetch('/obtenerTodosUsuarios', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.users = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  computed : {
    // The list of users that match the search pattern, if any.
    filteredList : function(){
      // Split the search pattern into tokens.
      const tokens = this.searchInput.split(' ').filter(Boolean);
      // Filter the users that match.
      return this.users.filter(function(user){
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
      });
    },
    // Test if no item matches the search pattern.
    noMatch : function(){
      return this.filteredList.length === 0 
        && this.users.length > 0
        && this.searchInput !== '';
    }
  },
  methods : {
    handleUserSelected : function(user){
      // Tell the parent this user has been selected.
      this.$emit('user-selected', user);
    }
  },
  mounted : function(){
    M.updateTextFields();
  },
  template : `
    <ul class="collection scrollable-collection">
      <li class="collection-item">
        <div class="row">
          <div class="input-field">
            <i class="material-icons prefix third-text">search</i>
            <input id="statistics-user-list-search-input"
              placeholder="Ingresa palabras clave"
              type="text" class="validate" 
              v-model:value="searchInput"/>
            <label for="statistics-user-list-search-input">
              Búsqueda de Usuarios
            </label>
          </div>
        </div>
      </li>
      <li class="collection-item"
        v-if="users.length === 0">
        No hay usuarios disponibles para seleccionar.
      </li>
      <li class="collection-item"
        v-if="noMatch">
        Ningún usuario coincide con los criterios de búsqueda.
      </li>
      <statistics-user-list-item
        v-for="user in filteredList"
        @user-selected="handleUserSelected"
        :key="user.idUsuario"
        :user="user">
      </statistics-user-list-item>
    </ul>
  `
});