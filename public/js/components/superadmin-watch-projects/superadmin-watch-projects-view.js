Vue.component('superadmin-watch-projects-view', {
  data : function(){
    return {
      searchInput : '',
      projects : []
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
    fetch('/obtenerProyectos', requestData)
    .then(response => response.json())
    .then(function(response){
      console.log(response);
      if(response.status === 'OK'){
        this.projects = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  computed : {
    filteredList : function(){
      // Split the search pattern into tokens.
      const tokens = this.searchInput.split(' ').filter(Boolean);
      // Filter the projects that match.
      return this.projects.filter(function(project){
        // If there is no search pattern, include the project.
        if(tokens.length == 0){
          return true;
        }
        // Check for all string fields in the project info for a match.
        for(var i in tokens){
          const token = tokens[i];
          for(var key in project){
            if(typeof project[key] === 'string'){
              if(project[key].includes(token)){
                return true;
              }
            }
          }
        }
        // The project didn´t match any token in the pattern.
        return false;
      });  
    },
    noProjectMatches : function(){
      return this.filteredList.length === 0 
        && this.projects.length > 0
        && this.searchInput !== '';
    }
  },
  template : `
    <div class="row">
      <div class="card">
        <div class="card-content">
          <span class="card-title first-text">
            <b>Proyectos</b>
          </span>
          <div class="row">
            <div class="col s12">
              <div class="input-field">
                <i class="material-icons prefix third-text">search</i>
                <input id="superadmin-watch-projects-search-input"
                  placeholder="Ingresa palabras clave"
                  type="text" class="validate"
                  v-model:value="searchInput"/>
                <label for="superadmin-watch-projects-search-input">
                  Búsqueda de Proyectos
                </label>
              </div>
            </div>
          </div>
          <ul class="collection">
            <li class="collection-item"
              v-if="filteredList.length === 0">
              <span>
                No hay proyectos que mostrar.
              </span>
            </li>
            <li class="collection-item"
              v-if="noProjectMatches">
              <span>
                No hay proyectos que coincidan con el patrón de búsqueda.
              </span>
            </li>
            <superadmin-watch-projects-list-item
              v-for="project in filteredList"
              :key="project.idProyecto"
              :project="project">
            </superadmin-watch-projects-list-item>
          </ul>
        </div>
      </div>
      <chat-sidenav-view>
      </chat-sidenav-view>
    </div>
  `
});