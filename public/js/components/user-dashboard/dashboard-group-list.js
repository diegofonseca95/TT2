/*
  This component represents the group list at the user
  info section in the dashboard.
*/
Vue.component('dashboard-group-list', {
  props : [
    'user' // The user looking at the dashboard.
  ],
  data : function(){
    return {
      groupsInfo : [] // The groups the user belongs to.
    };
  },
  beforeCreate : function(){
    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      idUsuario : this.user.idUsuario,
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the projects list.
    fetch('/obtenerGruposUsuario', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        var groupsInfo = [];
        for(var i in response.result){
          groupsInfo.push({
            groupLeader : response.result[i].lider,
            group : response.result[i].grupo
          });
        }
        this.userGroupsInfo = groupsInfo;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  template : `
    <ul class="collection scrollable-collection">
      <li class="collection-item grey-color">
        <span>
          El usuario no ha participado en algún grupo.
        </span>
      </li>
      <dashboard-group-list-item
        v-for="groupInfo in userGroupsInfo"
        :group-leader="groupInfo.groupLeader"
        :key="groupInfo.group.idGrupo"
        :group="groupInfo.group">
      </dashboard-group-list-item>
    </ul>
  `
});