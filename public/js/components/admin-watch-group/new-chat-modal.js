Vue.component('new-chat-modal', {
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
      // TODO : Submit new chat.
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        integrantes : this.newMemberList,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);
      /*
      // Fetch the projects list.
      fetch('/agregarUsuariosGrupo', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          // TODO : Toast if succeeded
          this.$emit('new-members-added', this.newMemberList);
          SuccessToast(response.result);
          this.newMemberList = [];
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
      */
    }
  },
  template : `
    <div id="new-chat-modal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Crear una nueva conversación</h4>
        <h6>Selecciona los usuarios para la nueva conversación:</h6>
        <new-member-list
          @remove-new-member="handleRemoveNewMember"
          @add-new-member="handleAddNewMember"
          :selected-bucket="selectedBucket"
          :users="users">
        </new-member-list>
      </div>
      <div class="modal-footer">
        <a class="waves-effect waves-green btn-flat"
          href="#!" @click="handleModalClose">
          Listo
        </a>
      </div>
    </div>
  `
});