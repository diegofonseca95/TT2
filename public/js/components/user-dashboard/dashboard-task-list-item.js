/*
  This component represents an item in the task list at the user
  info section in the dashboard.
*/
Vue.component('dashboard-task-list-item', {
  props : [
    'task' // The task associated to this item.
  ],
  template : `
    <li class="collection-item grey-color">
      <div class="row">
        <span class="title truncate col s12">
          {{ task.nombreTarea }}
        </span>
        <span class="title truncate col s12"></span>
        <span class="title truncate col s12">
          Para el grupo: Nombre del grupo
        </span>
        <span class="title truncate col s12">
          Para el proyecto: Nombre del proyecto
        </span>
        <span class="title truncate col s12">
          {{ task.descripcion }}
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