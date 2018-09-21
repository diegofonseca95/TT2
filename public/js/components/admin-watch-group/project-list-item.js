Vue.component('project-list-item', {
  props : ['project', 'projectLeader'],
  data : function(){
    return {};
  },
  computed : {
    projectLeaderFullName : function(){
      var fullName = this.projectLeader.nombre;
      if(this.projectLeader.apellidoPaterno !== ''){
        fullName += ' ' + this.projectLeader.apellidoPaterno;
      }
      if(this.projectLeader.apellidoMaterno !== ''){
        fullName += ' ' + this.projectLeader.apellidoMaterno;
      }
      return fullName;
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
          Líder del proyecto: {{ projectLeaderFullName }}
        </span>
        <div class="right">
          <a href="#!" title="Eliminar" class="btn remove-button-background">
            <i class="material-icons">remove</i>
          </a>
          <a href="#!" title="Ver" class="btn remove-button-background">
            <i class="material-icons">remove_red_eye</i>
          </a>
        </div>
      </div>
    </li>
  `
});

/*
<!-- Project Begins-->
<li class="collection-item avatar">
  <i class="material-icons circle third-background">folder</i>
  <div class="row">
    <span class="title truncate col s12">Nombre del proyecto</span>
    <span class="title truncate col s12">Líder del proyecto: Nombre Apellidos</span>
    <div class="right">
      <a href="#!" title="Eliminar" class="btn remove-button-background">
        <i class="material-icons">remove</i>
      </a>
      <a href="#!" title="Ver" class="btn remove-button-background">
        <i class="material-icons">remove_red_eye</i>
      </a>
    </div>
  </div>
</li>
<!-- Project Ends -->
*/