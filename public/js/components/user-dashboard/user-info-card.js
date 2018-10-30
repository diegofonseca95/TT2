Vue.component('user-info-card', {
  mounted : function(){
    M.Collapsible.init(
      document.getElementById('user-info-collapsible')
    );
  },
  template : `
    <ul class="collapsible" id="user-info-collapsible">
      <!-- User Groups Begin -->
      <li>
        <div class="collapsible-header">
          <i class="material-icons">group</i>
          Grupos en los que he participado
        </div>
        <div class="collapsible-body zero-padding">
          <dashboard-group-list>
          </dashboard-group-list>
        </div>
      </li>
      <!-- User Groups End -->
      <!-- User Projects Begin -->
      <li>
        <div class="collapsible-header">
          <i class="material-icons">folder</i>
          Proyectos en los que he colaborado
        </div>
        <div class="collapsible-body zero-padding">
          <dashboard-project-list>
          </dashboard-project-list>
        </div>
      </li>
      <!-- User Projects End -->
      <!-- User Tasks Begin -->
      <li>
        <div class="collapsible-header"><i class="material-icons">edit</i>Tareas que he realizado</div>
        <div class="collapsible-body zero-padding">
          <dashboard-task-list>
          </dashboard-task-list>
        </div>
      </li>
      <!-- User Tasks End -->
    </ul>
  `
});