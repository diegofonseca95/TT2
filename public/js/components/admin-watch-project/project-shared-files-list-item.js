Vue.component('project-shared-files-list-item', {
  props : [
    'file'  // The file information.
  ],
  computed : {
    downloadLink : function(){
      // Get the project id from the hidden input.
      var projectInput = document.querySelector(
        'input[name="project-id"]'
      );
      return '/descargarArchivo/' + projectInput.value +
        '/file/' + file.fileName;
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">attach_file</i>
      <div class="row">
        <span class="title truncate col s12">
          {{ file.fileName }}
        </span>
        <span class="title truncate col s12">
          <a :href="downloadLink" target="_blank">
            Descargar Archivo
          </a>
        </span>
      </div>
    </li>
  `
});