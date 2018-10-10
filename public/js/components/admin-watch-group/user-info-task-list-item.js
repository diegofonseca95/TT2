Vue.component('user-info-task-list-item', {
  props : ['taskInfo'],
  data : function(){
    return {};
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">create</i>
      <div class="row">
        <span class="title truncate col s12">
          Nombre de la tarea realizada
        </span>
        <span class="title truncate col s12">
          Para el grupo: Nombre del grupo
        </span>
        <span class="title truncate col s12">
          Para el proyecto: Nombre del proyecto
        </span>
        <span class="title truncate col s12">
          Descripción de la tarea realizada
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