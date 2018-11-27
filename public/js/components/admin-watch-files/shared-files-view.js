/*
  This component represents the files view.
*/
Vue.component('shared-files-view', {
  data : function(){
    return {
      selectedProject : {},
      selectedGroup : {},
      isProject : false,
      isGroup : false
    };
  },
  computed : {
    anythingSelected : function(){
      return this.isGroup || this.isProject;
    }
  },
  methods : {
    handleProjectSelected : function(project){
      this.selectedProject = project;
      this.isProject = true;
      this.isGroup = false;
    },
    handleGroupSelected : function(group){
      this.selectedGroup = group;
      this.isProject = false;
      this.isGroup = true;
    }
  },
  mounted : function(){
    M.Collapsible.init(
      document.querySelector(
        '#shared-files-projects-collapsible'
      )
    );
    M.Collapsible.init(
      document.querySelector(
        '#shared-files-groups-collapsible'
      )
    );
    M.Tabs.init(
      document.querySelector(
        '#shared-files-tab-strip'
      )
    );
  },
  template : `
    <div class="row">
      <!-- Tab Menu Begins -->
      <div class="col s12">
        <ul class="tabs" id="shared-files-tab-strip">
          <li class="tab col s12 m6">
            <a href="#shared-files-groups">
              Archivos de Grupos
            </a>
          </li>
          <li class="tab col s12 m6">
            <a href="#shared-files-projects">
              Archivos de Proyectos
            </a>
          </li>
        </ul>
      </div>
      <!-- Tab Menu Ends -->
      <!-- Groups Collapsible Begins -->
      <div class="col s12" id="shared-files-groups">
        <ul class="collapsible" id="shared-files-groups-collapsible">
          <li>
            <div class="collapsible-header">
              <i class="material-icons">group</i>Grupos
            </div>
            <div class="collapsible-body zero-padding">
              <!-- Groups List Begins-->
              <shared-files-group-list
                @group-selected="handleGroupSelected">
              </shared-files-group-list>
              <!-- Groups List Ends-->
            </div>
          </li>
        </ul>
      </div>
      <!-- Groups Collapsible Ends -->
      <!-- Projects Collapsible Begins -->
      <div class="col s12" id="shared-files-projects">
        <ul class="collapsible" id="shared-files-projects-collapsible">
          <li>
            <div class="collapsible-header">
              <i class="material-icons">folder</i>Proyectos
            </div>
            <div class="collapsible-body zero-padding">
              <!-- Projects List Begins-->
              <shared-files-project-list
                @project-selected="handleProjectSelected">
              </shared-files-project-list>
              <!-- Project List Ends-->
            </div>
          </li>
        </ul>
      </div>
      <!-- Projects Collapsible Ends -->
      <!-- Files section Begins -->
      <shared-files-list
        :selected-project="selectedProject"
        :selected-group="selectedGroup"
        v-if="anythingSelected"
        :is-project="isProject"
        :is-group="isGroup">
      </shared-files-list>
      <!-- Files section Ends -->
      <chat-sidenav-view>
      </chat-sidenav-view>
    </div>
  `
}); 