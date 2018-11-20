/*
  This component represents the statistics view.
*/
Vue.component('statistics-view', {
  data : function(){
    return {
      selected : {
        projects : false,
        groups : true,
        users : false
      }
    };
  },
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
  methods : {
    handleStripSelected : function(strips){
      this.selected = strips;
    }
  },
  template : `
    <div class="row">
      <statistics-category-tab-strip
        @strip-selected="handleStripSelected">
      </statistics-category-tab-strip>
      <div class="col s12" id="groups-view">
        <div class="row" v-if="selected.groups">
          <div class="col s12">
            <group-users-statistics-chart>
            </group-users-statistics-chart>
          </div>
          <div class="col s12">
            <group-projects-statistics-chart>
            </group-projects-statistics-chart>
          </div>
        </div>
        <!-- Group Statistics View -->
      </div>
      <div class="col s12" id="projects-view">
        <div class="row" v-if="selected.projects">
          <div class="col s12">
            <project-tasks-statistics-chart>
            </project-tasks-statistics-chart>
          </div>
          <div class="col s12">
            <project-iterations-statistics-chart>
            </project-iterations-statistics-chart>
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
        <div class="row">
          <div class="col s12">
            <user-tasks-statistics-chart>
            </user-tasks-statistics-chart>
          </div>
        </div>
      </div>
      <chat-sidenav-view>
      </chat-sidenav-view>
    </div>
  `
});