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