Vue.component('project-list-item', {
  props : ['project', 'projectLeader'],
  data : function(){
    return {};
  },
  methods : {
    handleWatchProject : function(){
      window.location.replace('/verProyecto/' + this.project.idProyecto);
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">folder</i>
      <div class="row">
        <span class="title truncate col s12">
          {{ project.nombreProyecto }}
        </span>
        <span class="title truncate col s12">
          Líder del proyecto :
          <user-full-name-span :user="projectLeader">
          </user-full-name-span>
        </span>
        <div class="right">
          <a href="#!" title="Eliminar" class="btn remove-button-background">
            <i class="material-icons">remove</i>
          </a>
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