Vue.component('project-list', {
  props : ['groupId'],
  data : function(){
    return {
      groupProjectsInfo : [
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
  template : `
    <ul class="collection scrollable-collection">
      <project-list-item
        v-for="projectInfo in groupProjectsInfo"
        :project-leader="projectInfo.projectLeader"
        :key="projectInfo.project.idProyecto"
        :project="projectInfo.project">
      </project-list-item>
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