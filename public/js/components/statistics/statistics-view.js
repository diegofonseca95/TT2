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
        <div class="row">
          <div class="col s12">
            <group-users-statistics-chart>
            </group-users-statistics-chart>
          </div>
          <div class="col s12">
            <group-projects-statistics-chart>
            </group-projects-statistics-chart>
          </div>
          <div class="col s12">

          </div>
        </div>
        <!-- Group Statistics View -->
      </div>
      <div class="col s12" id="projects-view">
        <div class="row">
          <div class="col s12">
            <project-tasks-statistics-chart>
            </project-tasks-statistics-chart>
          </div>
          <div class="col s12">
            <group-projects-statistics-chart>
            </group-projects-statistics-chart>
          </div>
          <div class="col s12">

          </div>
        </div>
        <!-- Project Statistics View -->
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