Vue.component('user-info-group-list', {
  props : ['user'],
  data : function(){
    return {
      userGroupsInfo : [
        {
          group : {
            idGrupo : 0,
            nombreGrupo : 'First Group',
            descripcion : 'blablabla'
          },
          groupLeader : {
            idUsuario : 0,
            nombre : 'Nombre',
            apellidoMaterno : 'ApellidoM',
            apellidoPaterno : 'ApellidoP'
          }
        },
        {
          group : {
            idGrupo : 1,
            nombreGrupo : 'Second Group',
            descripcion : 'blablabla'
          },
          groupLeader : {
            idUsuario : 1,
            nombre : 'Nombre',
            apellidoMaterno : 'ApellidoM',
            apellidoPaterno : 'ApellidoP'
          }
        },
        {
          group : {
            idGrupo : 2,
            nombreGrupo : 'Third Group',
            descripcion : 'blablabla'
          },
          groupLeader : {
            idUsuario : 2,
            nombre : 'Nombre',
            apellidoMaterno : 'ApellidoM',
            apellidoPaterno : 'ApellidoP'
          }
        }
      ]
    };
  },
  watch : {
    user : function(){
      // TODO : Fetch the groups related to the user.

      // TODO : Check if it works.
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
        console.log(response);
        if(response.status === 'OK'){
          // TODO : Toast if succeeded
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    }
  },
  template : `
    <ul class="collection scrollable-collection">
      <user-info-group-list-item
        v-for="groupInfo in userGroupsInfo"
        :group-leader="groupInfo.groupLeader"
        :key="groupInfo.group.idGrupo"
        :group="groupInfo.group">
      </user-info-group-list-item>
      <li class="collection-item"
        v-if="userGroupsInfo.length === 0">
        El usuario no ha participado en algún grupo.
      </li>
    </ul>
  `
});

/*
<ul class="collection scrollable-collection">
  <user-info-group-list-item 
    :group-leader="null"
    :group="group">
  </user-info-group-list-item>
</ul>
*/