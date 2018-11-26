/*
  This component represents the project list
  in the files view.
*/
Vue.component('shared-files-project-list', {
  data : function(){
    return {
      projectsInfo : [],  // The projects information.
      searchInput : ''    // The pattern to match in the project search.
    };
  },
  beforeCreate : function(){
    // TODO : Fetch the list.
  },
  computed : {
    // The list of projects that match the search pattern, if any.
    filteredList : function(){
      // Split the search pattern into tokens.
      const tokens = this.searchInput.split(' ').filter(Boolean);
      // Filter the projects that match.
      return this.projectsInfo.filter(function(project){
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
    // Test if no item matches the search pattern.
    noMatch : function(){
      return this.filteredList.length === 0 
        && this.projectsInfo.length > 0
        && this.searchInput !== '';
    }
  },
  methods : {
    handleProjectSelected : function(project){
      // Tell the parent this project has been selected.
      this.$emit('project-selected', project);
    }
  },
  template : `
    <ul class="collection scrollable-collection">
      <li class="collection-item">
        <div class="row">
          <div class="input-field">
            <i class="material-icons prefix third-text">search</i>
            <input id="statistics-project-list-search-input"
              placeholder="Ingresa palabras clave"
              type="text" class="validate" 
              v-model:value="searchInput"/>
            <label for="statistics-project-list-search-input">
              Búsqueda de Proyectos
            </label>
          </div>
        </div>
      </li>
      <li class="collection-item"
        v-if="projectsInfo.length === 0">
        No hay proyectos disponibles para seleccionar.
      </li>
      <li class="collection-item"
        v-if="noMatch">
        Ningún proyecto coincide con los criterios de búsqueda.
      </li>
    </ul>
  `
}); 