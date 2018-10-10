Vue.component('user-info-group-list-item', {
  props : ['group','groupLeader'],
  data : function(){
    return {};
  },
  methods : {
    watchGroup : function(){
      window.location.replace('/verGrupo/' + this.group.idGrupo);
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
          Líder del grupo:
          <user-full-name-span :user="groupLeader">
          </user-full-name-span>
        </span>
        <div class="right">
          <a class="btn remove-button-background"
            href="#!" title="Ver"
            @click="watchGroup">
            <i class="material-icons">remove_red_eye</i>
          </a>
        </div>
      </div>
    </li>
  `
});