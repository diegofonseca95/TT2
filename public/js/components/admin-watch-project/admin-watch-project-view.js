Vue.component('admin-watch-project-view', {
  data : function(){
    return {
      permissions : {},
      memberIds : [],
      users : []
    };
  },
  computed : {
    nonMemberList : function(){
      return this.users.filter(
        user => !this.memberIds.includes(user.idUsuario)
      );
    },
    memberList : function(){
      return this.users.filter(
        user => this.memberIds.includes(user.idUsuario)
      );
    }
  },
  methods : {
    handleNewMembersAdded : function(memberList){
      for(var i in memberList)
        this.memberIds.push(memberList[i]);
    },
    handleMemberRemoved : function(user){
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
        idUsuario : user.idUsuario,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the projects list.
      fetch('/eliminarUsuarioProyecto', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          this.memberIds = this.memberIds.filter(id => {
            return id !== user.idUsuario;
          });
          SuccessToast(response.result);
        }else{
          WarningToast(response.result);
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    }
  },
  beforeCreate : function(){
    // Get the project id from the hidden input.
    var projectIdInput = document.querySelector('input[name="project-id"]');

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
    fetch('/obtenerUsuariosGrupo', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.users = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));

    // Add the project identifier to the request body.
    requestBody.idProyecto = projectIdInput.value;
    delete requestBody.idGrupo;
    requestData.body = JSON.stringify(requestBody);

    fetch('/obtenerIdUsuariosProyecto', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.memberIds = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));

    fetch('/permisosProyectos', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.permissions = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  template : `
    <div class="row">
      <project-info-card :project-members="memberList">
      </project-info-card>

      <project-members-card 
        @member-removed="handleMemberRemoved($event)"
        @new-members-added="handleNewMembersAdded"
        :project-members="memberList"
        :permissions="permissions"
        :users="nonMemberList">
      </project-members-card>

      <iteration-card-group
        :permissions="permissions">
      </iteration-card-group>

      <task-card-group 
        :project-members="memberList"
        :permissions="permissions">
      </task-card-group>
      
      <chat-sidenav-view>
      </chat-sidenav-view>
    </div>
  `
});