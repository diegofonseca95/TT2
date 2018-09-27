Vue.component('group-info-card', {
  props : ['groupMembers'],
  data : function(){
    return {
      groupInfo : {
        name : 'El mejor grupo del mundo',
        description : 'La peor descripcion del universo',
        leader : null
      }
    };
  },
  beforeCreate : function(){
    // Get the group id from the hidden input.
    var groupIdInput = document.querySelector('input[name="group-id"]');
    var groupId = groupIdInput.value;

    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      _token : authToken.value,
      idGrupo : groupId
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the users list.
    fetch('/obtenerGrupo', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.groupInfo.description = response.result.descripcion;
        this.groupInfo.name = response.result.nombre;
        for(var i in this.groupMembers){
          if(this.groupMembers[i].idUsuario === response.result.lider){
            this.groupInfo.leader = this.groupMembers[i];
            break;
          }
        }
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  methods : {
    handleUpdatedInfo : function(newInfo){
      // Get the group id from the hidden input.
      var groupIdInput = document.querySelector('input[name="group-id"]');
      var groupId = groupIdInput.value;

      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        descripcion : newInfo.description,
        idUsuario : newInfo.leaderId,
        _token : authToken.value,
        nombre : newInfo.name,
        idGrupo : groupId
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the users list.
      fetch('/editarGrupo', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          this.groupInfo.description = newInfo.description;
          this.groupInfo.name = newInfo.name;
          for(var i in this.groupMembers){
            if(this.groupMembers[i].idUsuario === newInfo.leaderId){
              this.groupInfo.leader = this.groupMembers[i];
              break;
            }
          }
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    }
  },
  computed : {
    leaderFullName : function(){
      var fullName = this.groupInfo.leader.nombre;
      if(this.groupInfo.leader.apellidoPaterno !== ''){
        fullName += ' ' + this.groupInfo.leader.apellidoPaterno;
      }
      if(this.groupInfo.leader.apellidoMaterno !== ''){
        fullName += ' ' + this.groupInfo.leader.apellidoMaterno;
      }
      return fullName;
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>{{ groupInfo.name }}</b>
        </span>
        <div class="row">
          <span class="title col s12" style="word-break: break-all;">
            {{ groupInfo.description }}
          </span>
          <span class="title col s12" style="word-break: break-all;">
            Líder del grupo: {{ leaderFullName }}
          </span>
          <div class="col s12">
            <button title="Editar" data-target="edit-group-info-modal" 
              class="btn-floating btn-large modal-trigger remove-button-background right">
              <i class="material-icons">mode_edit</i>
            </button>
          </div>
        </div>
      </div>
      <edit-group-info-modal
        @group-info-updated='handleUpdatedInfo'
        :group-members="groupMembers"
        :group-info="groupInfo">
      </edit-group-info-modal>
    </div>
  `
});

/*
<!-- Group Info Begins -->
<div class="card">
  <div class="card-content">
    <span class="card-title first-text">
      <b>{{ groupInfo.nombre }}</b>
    </span>
    <div class="row">
      <span class="title col s12" style="word-break: break-all;">
        {{ groupInfo.descripcion }}
      </span>
      <span class="title col s12" style="word-break: break-all;">
        Líder del grupo: Nombre Apellido
      </span>
      <div class="col s12">
        <button title="Editar" data-target="edit-group-info-modal" class="btn-floating btn-large modal-trigger remove-button-background right">
          <i class="material-icons">mode_edit</i>
        </button>
      </div>
    </div>
  </div>
  <edit-group-info-modal :group-info="groupInfo" :group-members="users">
  </edit-group-info-modal>
</div>
<!-- Group Info Ends -->
*/