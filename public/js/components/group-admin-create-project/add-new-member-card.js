Vue.component('add-new-member-card', {
  props : ['users'],
  data : function(){
    return {
      selectedBucket : {}
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
          <b>Agregar usuarios al proyecto</b>
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