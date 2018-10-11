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
  mounted : function(){
    var elems = document.querySelector('#add-new-member-modal');
    var instances = M.Modal.init(elems);
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

      // Get the project id from the hidden input.
      var projectIdInput = document.querySelector('input[name="project-id"]');

      // TODO : Check if it works.
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        idProyecto : projectIdInput.value,
        integrantes : this.newMemberList,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the projects list.
      fetch('/agregarUsuariosProyecto', requestData)
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
        <h4>Agregar usuarios al proyecto</h4>
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