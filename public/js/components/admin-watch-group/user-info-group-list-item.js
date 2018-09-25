Vue.component('user-info-group-list-item', {
  props : ['group','groupLeader'],
  data : function(){
    return {};
  },
  computed : {
    groupLeaderFullName : function(){
      var fullName = this.groupLeader.nombre;
      if(this.groupLeader.apellidoPaterno !== ''){
        fullName += ' ' + this.groupLeader.apellidoPaterno;
      }
      if(this.groupLeader.apellidoMaterno !== ''){
        fullName += ' ' + this.groupLeader.apellidoMaterno;
      }
      return fullName;
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">group</i>
      <div class="row">
        <span class="title truncate col s12">
          {{ group.nombreGrupo }}
        </span>
        <span class="title truncate col s12">
          Líder del grupo: {{ groupLeaderFullName }}
        </span>
        <div class="right">
          <a class="btn remove-button-background"
            href="#!" title="Ver">
            <i class="material-icons">remove_red_eye</i>
          </a>
        </div>
      </div>
    </li>
  `
});

/*
<!-- Group Begins-->
<li class="collection-item avatar">
  <i class="material-icons circle third-background">group</i>
  <div class="row">
    <span class="title truncate col s12">
      Nombre del grupo
      <span class="hide-on-small-only">
        descripción extra del nombre de grupo
      </span>
    </span>
    <span class="title truncate col s12">
      Líder del grupo: Nombre apellido
    </span>
    <div class="right">
      <a href="#!" title="Ver" class="btn remove-button-background">
        <i class="material-icons">remove_red_eye</i>
      </a>
    </div>
  </div>
</li>
<!-- Group Ends -->
*/