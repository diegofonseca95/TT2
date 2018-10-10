Vue.component('project-list', {
  props : ['groupId'],
  data : function(){
    return {
      projects : []
    };
  },
  created : function(){
    // Get the group id from the hidden input.
    var groupIdInput = document.querySelector('input[name="group-id"]');

    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      idGrupo : groupIdInput.value,
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the projects list.
    fetch('/obtenerProyectosGrupo', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        var projectsInfo = [];
        for(var i in response.result){
          projectsInfo.push({
            projectLeader : response.result[i].lider,
            project : response.result[i].proyecto
          });
        }
        this.projects = projectsInfo;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  template : `
    <ul class="collection scrollable-collection">
      <project-list-item
        v-for="projectInfo in projects"
        :project-leader="projectInfo.projectLeader"
        :key="projectInfo.project.idProyecto"
        :project="projectInfo.project">
      </project-list-item>
      <li class="collection-item"
        v-if="projects.length === 0">
        No hay proyectos disponibles.
      </li>
    </ul>
  `
});