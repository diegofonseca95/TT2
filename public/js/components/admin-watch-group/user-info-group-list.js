Vue.component('user-info-group-list', {
  props : ['userId'],
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
  template : `
    <ul class="collection scrollable-collection">
      <user-info-group-list-item
        v-for="groupInfo in userGroupsInfo"
        :group-leader="groupInfo.groupLeader"
        :key="groupInfo.group.idGrupo"
        :group="groupInfo.group">
      </user-info-group-list-item>
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