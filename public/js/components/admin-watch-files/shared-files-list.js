Vue.component('shared-files-list', {
  props : [
    'selectedProject',
    'selectedGroup',
    'isProject',
    'isGroup'
  ],
  data : function(){
    return {
      searchInput : '', // The search pattern.
      fileCounter : 0,
      files : []        // The files.
    };
  },
  computed : {
    // The list of files that match the search pattern, if any.
    filteredList : function(){
      // Split the search pattern into tokens.
      const tokens = this.searchInput.split(' ').filter(Boolean);
      // Filter the files that match.
      return this.files.filter(function(file){
        // If there is no search pattern, include the file.
        if(tokens.length == 0){
          return true;
        }
        // Check for all string fields in the file info for a match.
        for(var i in tokens){
          const token = tokens[i];
          for(var key in file){
            if(typeof file[key] === 'string'){
              if(file[key].includes(token)){
                return true;
              }
            }
          }
        }
        // The file didn´t match any token in the pattern.
        return false;
      });
    },
    noFileMatches : function(){
      return this.filteredList.length === 0 
        && this.searchInput !== ''
        && this.files.length > 0;
    }
  },
  mounted : function(){
    M.updateTextFields();
  },
  watch : {
    selectedProject : function(){
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
        idProyecto : selectedProject.idProyecto,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the project list.
      fetch('/obtenerGrupos', requestData)
      .then(response => response.json())
      .then(function(response){
        var groups = [];
        for(var i in response){
          groups.push(response[i]);
        }
        this.groupsInfo = groups;
        // TODO : Handle non 'OK' status.
      }.bind(this));
    },
    selectedGroup : function(){
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
        idProyecto : selectedGroup.idGrupo,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the project list.
      fetch('/obtenerArchivosGrupos', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          this.fileCounter = 0;
          var allFiles = [];
          for(var i in response.result){
            allFiles.push({
              projectId : response.result[i].idProyecto,
              fileName : response.result[i].nombre,
              fileId : ++this.fileCounter
            });
          }
          this.files = allFiles;
        }else{
          WarningToast(response.result);
        }
      }.bind(this));
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>Archivos Compartidos</b>
        </span>
        <!-- Search Component Begins -->
        <div class="row">
          <div class='input-field col s12'>
            <i class='material-icons prefix third-text'>search</i>
            <input placeholder='Ingresa palabras clave' 
              type='text' class='validate'
              v-model:value="searchInput">
            <label>Búsqueda de Archivos</label>
          </div>
        </div>
        <!-- Search Component Ends -->
        <!-- File Collection Begins -->
        <ul class="collection scrollable-collection">
          <li class="collection-item" 
            v-if="files.length === 0">
            <span>No hay archivos compartidos en el proyecto.</span>
          </li>
          <li class="collection-item" 
            v-if="noFileMatches">
            <span>Ningún archivo coincide con el criterio de búsqueda.</span>
          </li>
          <shared-files-list-item
            v-for="file in filteredList"
            :key="file.fileId"
            :file="file">
          </shared-files-list-item>
        </ul>
        <!-- File Collections Ends -->
      </div>
    </div>
  `
});