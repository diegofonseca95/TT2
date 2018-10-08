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

    console.log(requestBody);

    requestData.body = JSON.stringify(requestBody);

    // Fetch the projects list.
    fetch('/obtenerProyectosGrupo', requestData)
    .then(response => response.json())
    .then(function(response){
      console.log(response);
      if(response.status === 'OK'){
        this.projects = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  template : `
    <ul class="collection scrollable-collection">
      <project-list-item
        v-for="project in projects"
        :project-leader="project.lider"
        :key="project.idProyecto"
        :project="project">
      </project-list-item>
      <li class="collection-item"
        v-if="projects.length === 0">
        No hay proyectos disponibles.
      </li>
    </ul>
  `
});

/*
<ul class="collection scrollable-collection">
  <project-list-item
    v-for="projectInfo in groupProjectsInfo"
    :project-leader="projectInfo.projectLeader"
    :key="projectInfo.project.idProyecto"
    :project="projectInfo.project">
  </project-list-item>
</ul>
*/