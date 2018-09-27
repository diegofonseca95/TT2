Vue.component('add-new-member-modal', {
  props : ['users'],
  data : function(){
    return {
      selectedBucket : {},
      newMemberList : []
    };
  },
  created : function(){
    var bucket = {};
    for(var x in this.users){
      bucket[this.users[x].idUsuario] = false;
    }   
    this.selectedBucket = bucket;
  },
  watch : {
    users : function(){
      var bucket = {};
      for(var x in this.users){
        bucket[this.users[x].idUsuario] = false;
      }   
      this.selectedBucket = bucket;
    }
  },
  methods : {
    handleRemoveNewMember : function(userId){
      this.$emit('remove-new-member', userId);
      this.selectedBucket[userId] = false;
      this.newMemberList = this.newMemberList.filter(id => {
        return id !== userId;
      });
    },
    handleAddNewMember : function(userId){
      this.$emit('add-new-member', userId);
      this.selectedBucket[userId] = true;
      if(!this.newMemberList.includes(userId)){
        this.newMemberList.push(userId);
      }
    },
    handleModalClose : function(){
      if(this.newMemberList.length === 0){
        return;
      }

      // Get the group id from the hidden input.
      var groupIdInput = document.querySelector('input[name="group-id"]');
      var groupId = groupIdInput.value;

      // TODO : Check if it works.
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        integrantes : this.newMemberList,
        _token : authToken.value,
        idGrupo : groupId
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the projects list.
      fetch('/agregarUsuariosGrupo', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          // TODO : Toast if succeeded
          this.$emit('new-members-added', this.newMemberList);
          this.newMemberList = [];
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    }
  },
  template : `
    <div id="add-new-member-modal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Agregar usuarios al grupo</h4>
        <new-member-list
          @remove-new-member="handleRemoveNewMember"
          @add-new-member="handleAddNewMember"
          :selected-bucket="selectedBucket"
          :users="users">
        </new-member-list>
      </div>
      <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn-flat"
          href="#!" @click="handleModalClose">
          Listo
        </a>
      </div>
    </div>
  `
});

/*
<!-- Add User to Group Modal Definition Begins -->
<div id="modal_addUserToGroup" class="modal modal-fixed-footer">
  <div class="modal-content">
    <h4>Agregar usuarios al grupo</h4>
    <new-member-list :users="users">
    </new-member-list>
  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Listo</a>
  </div>
</div>
<!-- Add User to Group Modal Definition Ends-->
*/