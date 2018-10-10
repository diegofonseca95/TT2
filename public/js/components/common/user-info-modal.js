Vue.component('user-info-modal', {
  props : ['user'],
  data : function(){
    return {};
  },
  template : `
    <div id="user-info-modal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>
          <user-full-name-span :user="user">
          </user-full-name-span>
        </h4>
        <!-- User Groups Begin -->
        <div class="card">
          <div class="card-content">
            <span class="card-title first-text">
              <b>Grupos en los que ha participado</b>
            </span>
            <user-info-group-list :user="user">
            </user-info-group-list>
          </div>
        </div>
        <!-- User Groups End -->
        <!-- User Projects Begin -->
        <div class="card">
          <div class="card-content">
            <span class="card-title first-text">
              <b>Proyectos en los que ha colaborado</b>
            </span>
            <user-info-project-list :user="user">
            </user-info-project-list>
          </div>
        </div>
        <!-- User Projects End -->
        <!-- User Tasks Begin -->
        <div class="card">
          <div class="card-content">
            <span class="card-title first-text">
              <b>Tareas que ha realizado</b>
            </span>
            <user-info-task-list :user="user">
            </user-info-task-list>
          </div>
        </div>
        <!-- User Tasks End -->
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn-flat"
          href="#!">
          Entendido
        </a>
      </div>
    </div>
  `
});