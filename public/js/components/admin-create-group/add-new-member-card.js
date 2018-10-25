Vue.component('add-new-member-card', {
  props : ['memberIds','users'],
  data : function(){
    return {
      selectedBucket : {}
    };
  },
  created : function(){
    // TODO : Try to put it inside a function, I dare you.
    var bucket = {};
    this.users.map(user => {
      var id = user.idUsuario;
      bucket[id] = this.memberIds.includes(id);
      return user;
    });
    this.selectedBucket = bucket;
  },
  watch : {
    memberIds : function(){
      var bucket = {};
      this.users.map(user => {
        var id = user.idUsuario;
        bucket[id] = this.memberIds.includes(id);
        return user;
      });
      this.selectedBucket = bucket;
    },
    users : function(){
      var bucket = {};
      this.users.map(user => {
        var id = user.idUsuario;
        bucket[id] = this.memberIds.includes(id);
        return user;
      });
      this.selectedBucket = bucket;
    }
  },
  methods : {
    handleRemoveNewMember : function(userId){
      this.$emit('remove-new-member', userId);
      this.selectedBucket[userId] = false;
    },
    handleAddNewMember : function(userId){
      this.$emit('add-new-member', userId);
      this.selectedBucket[userId] = true;
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <span class="card-title first-text">
          <b>Agregar usuarios al grupo</b>
        </span>
        <new-member-list
          @remove-new-member="handleRemoveNewMember"
          @add-new-member="handleAddNewMember"
          :selected-bucket="selectedBucket"
          :users="users">
        </new-member-list>
      </div>
    </div>
  `
});