Vue.component('admin-watch-project-view', {
  data : function(){
    return {
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
    var requestBody = { _token : authToken.value };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the users list.
    fetch('/obtenerUsuariosActivos', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.users = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));

    // Add the project identifier to the request body.
    requestBody.idGrupo = groupIdInput.value;
    requestData.body = JSON.stringify(requestBody);

    fetch('/obtenerIdUsuariosGrupo', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        var groupMemberIds = response.result;
        this.users = this.users.filter(
          user => groupMemberIds.includes(user.idUsuario)
        );
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
  },
  template : `
    <div class="row z-depth-5">
      <project-members-card 
        @member-removed="handleMemberRemoved($event)"
        @new-members-added="handleNewMembersAdded"
        :project-members="memberList"
        :users="nonMemberList">
      </project-members-card>
      <!-- Iteration List Placeholder -->
      <new-iteration-card>
      </new-iteration-card>
      <!-- Unassigned Tasks Placeholder -->
      <new-task-card>
      </new-task-card>
    </div>
  `
});