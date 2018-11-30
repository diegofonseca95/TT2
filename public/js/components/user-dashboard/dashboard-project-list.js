/*
  This component represents the project list at the user
  info section in the dashboard.
*/
Vue.component('dashboard-project-list', {
  props : [
    'user' // The user looking at the dashboard.
  ],
  data : function(){
    return {
      projectsInfo : [] // The projects the user belongs to.
    };
  },
  created : function(){
    var userInput = document.querySelector('input[name="user-id"]');
    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      idUsuario : userInput.value,
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the projects list.
    fetch('/obtenerProyectosUsuario', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        // TODO : Toast if succeeded
        var projects = [];
        for(var i in response.result){
          projects.push({
            projectLeader : response.result[i].lider,
            project : response.result[i].proyecto
          });
        }
        this.projectsInfo = projects;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  template : `
    <ul class="collection scrollable-collection">
      <li class="collection-item grey-color"
		v-if="projectsInfo.length === 0">
        <span>
          El usuario no ha participado en algún proyecto.
        </span>
      </li>
      <dashboard-project-list-item
        v-for="projectInfo in projectsInfo"
        :project-leader="projectInfo.projectLeader"
        :key="projectInfo.project.idProyecto"
        :project="projectInfo.project">
      </dashboard-project-list-item>
    </ul>
  `
});