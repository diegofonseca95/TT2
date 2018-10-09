Vue.component('admin-watch-group-view', {
  data : function(){
    return {
      memberIds : [],
      groupId : null,
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
      this.memberIds = this.memberIds.filter(id => {
        return id !== user.idUsuario;
      });
    }
  },
  beforeCreate : function(){
    // Get the group id from the hidden input.
    var groupIdInput = document.querySelector('input[name="group-id"]');
    this.groupId = groupIdInput.value;

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

    // Add the group identifier to the request body.
    requestBody.idGrupo = this.groupId;
    requestData.body = JSON.stringify(requestBody);

    fetch('/obtenerIdUsuariosGrupo', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.memberIds = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  template : `
    <div class="row">
      <group-info-card :group-members="memberList">
      </group-info-card>
      
      <group-members-card 
        @member-removed="handleMemberRemoved($event)"
        @new-members-added="handleNewMembersAdded"
        :group-members="memberList"
        :users="nonMemberList">
      </group-members-card>

      <group-projects-card :group-id="groupId">
      </group-projects-card>
    </div>
  `
});