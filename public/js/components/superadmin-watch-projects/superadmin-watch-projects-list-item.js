Vue.component('superadmin-watch-projects-list-item', {
  props : [
    'project'
  ],
  computed : {
    projectLink : function(){
      return '/verProyecto/' + this.project.idProyecto;
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">folder</i>
      <div class="row">
        <span class="title truncate col s12 hide-on-small-only">
          {{ project.nombreProyecto }}
        </span>
        <span class="col s12 hide-on-small-only"
          style="word-break: break-all;">
          {{ project.descripcion }}
        </span>
        <div class="right">
          <a class="btn remove-button-background" 
            title="Ver proyecto"
            :href="projectLink">
            <i class="material-icons">remove_red_eye</i>
          </a>
        </div>
      </div>
    </li>
  `
});