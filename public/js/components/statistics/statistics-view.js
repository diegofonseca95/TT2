/*
  This component represents the statistics view.
*/
Vue.component('statistics-view', {
  mounted : function(){
    M.Tabs.init(
      document.querySelector(
        '#statistics-category-tab-strip'
      )
    );
    M.Collapsible.init(
      document.querySelectorAll(
        '.collapsible'
      )
    );
  },
  template : `
    <div class="row">
      <statistics-category-tab-strip>
      </statistics-category-tab-strip>
      <div class="col s12" id="groups-view">
        <ul class="collapsible">
          <li>
            <div class="collapsible-header">
              <i class="material-icons">group</i>Grupos
            </div>
            <div class="collapsible-body zero-padding">
              <statistics-group-list>
              </statistics-group-list>
            </div>
          </li>
        </ul>
      </div>
      <div class="col s12" id="projects-view">
        <ul class="collapsible">
          <li>
            <div class="collapsible-header">
              <i class="material-icons">folder</i>Proyectos
            </div>
            <div class="collapsible-body zero-padding">
              <statistics-project-list>
              </statistics-project-list>
            </div>
          </li>
        </ul>
      </div>
      <div class="col s12" id="users-view">
        <ul class="collapsible">
          <li>
            <div class="collapsible-header">
              <i class="material-icons">person</i>Usuarios
            </div>
            <div class="collapsible-body zero-padding">
              <statistics-user-list>
              </statistics-user-list>
            </div>
          </li>
        </ul>
      </div>
      <chat-sidenav-view>
      </chat-sidenav-view>
    </div>
  `
});