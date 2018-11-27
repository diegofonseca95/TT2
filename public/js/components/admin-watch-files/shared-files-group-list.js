/*
  This component represents the group list
  in the files view.
*/
Vue.component('shared-files-group-list', {
  data : function(){
    return {
      searchInput : '', // The pattern to match in the group search.
      groupsInfo : []   // The group information.
    };
  },
  beforeCreate : function(){
    var authToken = document.querySelector(
      'input[name="_token"]'
    );

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

    // Fetch the project list.
    fetch('/obtenerGrupos', requestData)
    .then(response => response.json())
    .then(function(response){
      console.log(response);
      if(response.status === 'OK'){
        this.groupsInfo = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  computed : {
    // The list of groups that match the search pattern, if any.
    filteredList : function(){
      // Split the search pattern into tokens.
      const tokens = this.searchInput.split(' ').filter(Boolean);
      // Filter the groups that match.
      return this.groupsInfo.filter(function(group){
        // If there is no search pattern, include the group.
        if(tokens.length == 0){
          return true;
        }
        // Check for all string fields in the group info for a match.
        for(var i in tokens){
          const token = tokens[i];
          for(var key in group){
            if(typeof group[key] === 'string'){
              if(group[key].includes(token)){
                return true;
              }
            }
          }
        }
        // The group didn´t match any token in the pattern.
        return false;
      });
    },
    // Test if no item matches the search pattern.
    noMatch : function(){
      return this.filteredList.length === 0 
        && this.groupsInfo.length > 0
        && this.searchInput !== '';
    }
  },
  methods : {
    handleGroupSelected : function(group){
      // Tell the parent this group has been selected.
      this.$emit('group-selected', group);
    }
  },
  template : `
    <ul class="collection scrollable-collection">
      <li class="collection-item">
        <div class="row">
          <div class="input-field">
            <i class="material-icons prefix third-text">search</i>
            <input id="statistics-group-list-search-input"
              placeholder="Ingresa palabras clave"
              type="text" class="validate" 
              v-model:value="searchInput"/>
            <label for="statistics-group-list-search-input">
              Búsqueda de Grupos
            </label>
          </div>
        </div>
      </li>
      <li class="collection-item"
        v-if="groupsInfo.length === 0">
        No hay grupos disponibles para seleccionar.
      </li>
      <li class="collection-item"
        v-if="noMatch">
        Ningún grupo coincide con los criterios de búsqueda.
      </li>
      <!--
      <shared-files-group-list-item
        v-for="groupInfo in filteredList"
        @group-selected="handleGroupSelected"
        :key="groupInfo.idGrupo"
        :group-info="groupInfo">
      </shared-files-group-list-item>
      -->
    </ul>
  `
}); 
