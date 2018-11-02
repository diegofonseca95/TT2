/*
  This component represents an item in the task list at the user
  info section in the dashboard.
*/
Vue.component('dashboard-task-list-item', {
  props : [
    'taskInfo' // The task associated to this item.
  ],
  template : `
    <li class="collection-item grey-color">
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