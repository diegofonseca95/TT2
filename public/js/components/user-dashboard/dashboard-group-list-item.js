/*
  This component represents an item in the group list at the user
  info section in the dashboard.
*/
Vue.component('dashboard-group-list-item', {
  props : [
    'groupLeader',  // The group's leader information.
    'group'         // The group information.
  ],
  methods : {
    handleWatchGroup : function(){
      window.location.replace('/verGrupo/' + this.group.idGrupo);
    }
  },
  template : `
    <li class="collection-item grey-color">
      <div class="row">
        <div class="col s12 m10">
          <span class="title truncate col s12">
            {{ group.nombreGrupo }}
          </span>
          <span class="title truncate col s12">
            Líder del grupo: 
            <user-full-name-span :user="groupLeader">
            </user-full-name-span>
          </span>
        </div>
        <div class="right">
          <a class="btn remove-button-background"
            href="#!" title="Ver"
            @click="handleWatchGroup">
            <i class="material-icons">remove_red_eye</i>
          </a>
        </div>
      </div>
    </li>
  `
});