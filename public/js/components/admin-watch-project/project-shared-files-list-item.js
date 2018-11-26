Vue.component('project-shared-files-list-item', {
  props : [
    'file'  // The file information.
  ],
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">attach_file</i>
      <div class="row">
        <span class="title truncate col s12">
          {{ file.fileName }}
        </span>
        <span class="title truncate col s12">
          <a href="#">Descargar Archivo</a>
        </span>
      </div>
    </li>
  `
});