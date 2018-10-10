Vue.component('user-info-project-list', {
  props : ['user'],
  data : function(){
    return {
      userProjectsInfo : []
    };
  },
  watch : {
    user : function(){
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
      fetch('/obtenerProyectosUsuario', requestData)
      .then(response => response.json())
      .then(function(response){
        console.log(response);
        if(response.status === 'OK'){
          // TODO : Toast if succeeded
          var projectsInfo = [];
          for(var i in response.result){
            projectsInfo.push({
              projectLeader : response.result[i].lider,
              project : response.result[i].proyecto
            });
          }
          this.userProjectsInfo = projectsInfo;
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