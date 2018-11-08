/*
  This component represents an item in the project list at the user
  info section in the dashboard.
*/
Vue.component('dashboard-project-list-item', {
  props : [
    'projectLeader', // The project's leader information.
    'project' // The project information.
  ],
  methods : {
    handleWatchProject : function(){
      window.location.replace('/verProyecto/' + this.project.idProyecto);
    }
  },
  template : `
    <li class="collection-item grey-color">
      <div class="row">
        <div class="col s12 m10">
          <span class="title truncate col s12">
            {{ project.nombreProyecto }}
          </span>
          <span class="title truncate col s12">
            Líder del proyecto: 
            <user-full-name-span :user="groupLeader">
            </user-full-name-span>
          </span>
        </div>
        <div class="right">
          <a class="btn remove-button-background"
            href="#!" title="Ver"
            @click="handleWatchProject">
            <i class="material-icons">remove_red_eye</i>
          </a>
        </div>
      </div>
    </li>
  `
});