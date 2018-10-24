Vue.component('user-info-task-list-item', {
  props : ['taskInfo'],
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">create</i>
      <div class="row">
        <span class="title truncate col s12">
          Para el grupo: {{ taskInfo.group.nombreGrupo }}
        </span>
        <span class="title truncate col s12">
          Para el proyecto: {{ taskInfo.project.nombreProyecto }}
        </span>
        <span class="title truncate col s12">
          Descripción : {{ taskInfo.task.descripcion }}
        </span>
        <span class="title truncate col s12">
          <a href="#!">
            Descargar evidencia
          </a>
        </span>
      </div>
    </li>
  `
});