Vue.component('user-info-project-list', {
  props : ['user'],
  data : function(){
    return {
      userProjectsInfo : [
        {
          project : {
            idProyecto : 0,
            nombreProyecto : 'First Project'
          },
          projectLeader : {
            idUsuario : 0,
            nombre : 'Nombre',
            apellidoMaterno : 'ApellidoM',
            apellidoPaterno : 'ApellidoP'
          }
        },
        {
          project : {
            idProyecto : 1,
            nombreProyecto : 'Second Project'
          },
          projectLeader : {
            idUsuario : 1,
            nombre : 'Nombre',
            apellidoMaterno : 'ApellidoM',
            apellidoPaterno : 'ApellidoP'
          }
        },
        {
          project : {
            idProyecto : 2,
            nombreProyecto : 'Third Project'
          },
          projectLeader : {
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
      // TODO : Featch the projects the user has participated in.
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
      fetch('/agregarUsuariosGrupo', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          // TODO : Toast if succeeded
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    }
  },
  template : `
    <ul class="collection scrollable-collection">
      <user-info-project-list-item
        v-for="projectInfo in userProjectsInfo"
        :project-leader="projectInfo.projectLeader"
        :key="projectInfo.project.idProyecto"
        :project="projectInfo.project">
      </user-info-project-list-item>
      <li class="collection-item"
        v-if="userProjectsInfo.length === 0">
        El usuario no ha participado en algún proyecto.
      </li>
    </ul>
  `
});

/*
<ul class="collection scrollable-collection">
  <user-info-project-list-item
    v-for="projectInfo in userProjectsInfo"
    :project-leader="projectInfo.projectLeader"
    :key="projectInfo.project.idProyecto"
    :project="projectInfo.project">
  </user-info-project-list-item>
</ul>
*/