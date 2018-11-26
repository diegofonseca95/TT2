Vue.component('project-shared-files', {
  data : function(){
    return {
      searchInput : '', // The search pattern.
      fileCounter : 0,  // The number of files.
      files : []        // The files.
    };
  },
  beforeCreate : function(){
    // Fetch the files.
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
  methods : {
    triggerFileInput : function(){
      // Open the file picker from the hidden file input.
      var fileInput = document.querySelector(
        '#project-shared-files-file-input'
      );
      fileInput.value = '';
      fileInput.click();
    },
    sendFile : function(){
      var fileInput = document.querySelector(
        '#project-shared-files-file-input'
      );
      if(fileInput.value !== ''){
        // Get the project id from the hidden input.
        var projectIdInput = document.querySelector(
          'input[name="project-id"]'
        );
        var authToken = document.querySelector(
          'input[name="_token"]'
        );
        var file = fileInput.files[0];
        if(file.size > 5000000){
          WarningToast('Tamaño máximo de 5MB.');
          return;
        }
        var data = new FormData();
        data.append('idProyecto', projectIdInput.value);
        data.append('_token', authToken.value);
        data.append('name', file.name);
        data.append('file', file);
        fetch('/subirArchivo', {
          method : 'POST',
          body : data
        })
        .then(response => response.json())
        .then(function(response){
          if(response.status === 'OK'){
            SuccessToast(response.result);
          }else{
            WarningToast(response.result);
          }
        }.bind(this));
      }
    }
  },
  mounted : function(){
    M.updateTextFields();
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>Archivos Compartidos del Proyecto</b>
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
          <project-shared-files-list-item
            v-for="file in filteredList"
            :key="file.fileId"
            :file="file">
          </project-shared-files-list-item>
        </ul>
        <!-- File Collections Ends -->
        <div class="row">
          <input type="file" class="hide"
            id="project-shared-files-file-input" 
            @change="sendFile" />
          <div class="btn remove-button-background right"
            @click="triggerFileInput">
            <span>Subir archivo</span>
          </div>
        </div>
      </div>
    </div>
  `
});