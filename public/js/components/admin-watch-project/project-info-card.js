Vue.component('project-info-card', {
  props : [
    'projectMembers'
  ],
  data : function(){
    return {
      projectInfo : {
        description : '',
        startDate : '',
        leader : {},
        name : ''
      },
      editPermission : false,
      isActive : false
    };
  },
  beforeCreate : function(){
    // Get the project id from the hidden input.
    var projectIdInput = document.querySelector('input[name="project-id"]');

    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      idProyecto : projectIdInput.value,
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the project information.
    fetch('/obtenerProyecto', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        var result = response.result;
        var newInfo = {};
        newInfo.description = result.proyecto.descripcion;
        newInfo.startDate = result.proyecto.fecha_inicio;
        newInfo.name = result.proyecto.nombreProyecto;
        for(var i in this.projectMembers){
          if(this.projectMembers[i].idUsuario === result.lider){
            newInfo.leader = this.projectMembers[i];
            break;
          }
        }
        this.editPermission = result.permiso;
        this.isActive = result.activo;
        this.projectInfo = newInfo;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  methods : {
    handleUpdatedInfo : function(newInfo){
      // Get the project id from the hidden input.
      var projectIdInput = document.querySelector('input[name="project-id"]');

      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        descripcion : newInfo.description,
        idProyecto : projectIdInput.value,
        nombreProyecto : newInfo.name,
        idUsuario : newInfo.leaderId,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Send the new information to the server.
      fetch('/editarProyecto', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          this.projectInfo.description = newInfo.description;
          this.projectInfo.name = newInfo.name;
          for(var i in this.projectMembers){
            if(this.projectMembers[i].idUsuario === newInfo.leaderId){
              this.projectInfo.leader = this.projectMembers[i];
              break;
            }
          }
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    },
    handleFinishProject : function(){
      // Get the project id from the hidden input.
      var projectIdInput = document.querySelector('input[name="project-id"]');

      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        idProyecto : projectIdInput.value,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Send the new information to the server.
      fetch('/terminarProyecto', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          this.$emit('permissions-updated', response.permiso);
          SuccessToast(response.result);
          this.editPermission = false;
          this.isActive = false;
        }else{
          WarningToast(response.result);
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    }
  },
  computed : {
    hasAnyPermission : function(){
      return this.isActive || this.editPermission;
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>{{ projectInfo.name }}</b>
        </span>
        <div class="row">
          <span class="title col s12" style="word-break: break-all;">
            {{ projectInfo.description }}
          </span>
          <span class="title col s12" style="word-break: break-all;">
            Líder del proyecto:
            <user-full-name-span
              :user="this.projectInfo.leader">
            </user-full-name-span>
          </span>
          <span class="title col s12" style="word-break: break-all;">
            Fecha de inicio : {{ projectInfo.startDate }}
          </span>
          <span class="title col s12" style="word-break: break-all;"
            v-if="!isActive">
            El proyecto ha sido terminado.
          </span>
          <div class="col s12" v-if="hasAnyPermission">
            <button class="btn-floating btn-large remove-button-background right"
              title="Terminar Proyecto" @click="handleFinishProject"
              v-if="isActive">
              <i class="material-icons">done</i>
            </button>
            <button class="btn-floating btn-large modal-trigger remove-button-background right low-margin-right"
              title="Editar" data-target="edit-project-info-modal" v-if="editPermission">
              <i class="material-icons">mode_edit</i>
            </button>
          </div>
        </div>
      </div>
      <edit-project-info-modal
        @project-info-updated='handleUpdatedInfo'
        :project-members="projectMembers"
        :project-info="projectInfo"
        v-if="editPermission">
      </edit-project-info-modal>
    </div>
  `
});