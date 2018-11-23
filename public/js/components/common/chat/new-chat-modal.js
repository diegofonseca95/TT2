Vue.component('new-chat-modal', {
  props : ['users'],
  data : function(){
    return {
      selectedBucket : {},
      newMemberList : []
    };
  },
  mounted : function(){
    M.Modal.init(
      document.querySelector(
        '#new-chat-modal'
      )
    );
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
        usuarios : this.newMemberList,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Create new chat.
      fetch('/nuevaConversacion', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          SuccessToast(response.result);
          this.newMemberList = [];
          M.Modal.getInstance(
            document.querySelector(
              '#new-chat-modal'
            )
          ).close();
        }else{
          WarningToast(response.result);
        }
      }.bind(this));
    }
  },
  template : `
    <div id="new-chat-modal" class="modal modal-fixed-footer">
      <div class="modal-content">
        <h4>Crear una nueva conversación</h4>
        <h6>Selecciona los usuarios para la nueva conversación:</h6>
        <new-chat-member-list
          @remove-new-member="handleRemoveNewMember"
          @add-new-member="handleAddNewMember"
          :selected-bucket="selectedBucket"
          :users="users">
        </new-chat-member-list>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">
          Cancelar
        </a>
        <a class="waves-effect waves-green btn-flat"
          href="#!" @click="handleModalClose">
          Listo
        </a>
      </div>
    </div>
  `
});