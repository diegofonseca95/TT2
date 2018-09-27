Vue.component('new-member-list', {
  props : ['users','selectedBucket'],
  data : function(){
    return {
      searchInput : ''
    };
  },
  computed : {
    filteredList : function(){
      const tokens = this.searchInput.split(' ').filter(Boolean);
      return this.users.filter(function(user){
        if(this.selectedBucket[user.idUsuario]){
          return true;
        }
        if(tokens.length == 0){
          return true;
        }
        for(var i in tokens){
          const token = tokens[i];
          for(var key in user){
            if(typeof user[key] === 'string'){
              if(user[key].includes(token)){
                return true;
              }
            }
          }
        }
        return false;
      }.bind(this))
      .sort(function(a, b){
        if(this.selectedBucket[a.idUsuario] === true)
          return -1; // Place 'a' before 'b'
        if(this.selectedBucket[b.idUsuario] === true)
          return +1; // Place 'b' before 'a'
        return 0;
      }.bind(this));
    }
  },
  methods : {
    handleRemoveNewMember : function(userId){
      this.$emit('remove-new-member', userId);
    },
    handleAddNewMember : function(userId){
      this.$emit('add-new-member', userId);
    }
  },
  template : `
    <div class="row">
      <form class="col s12">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <div class='input-field col s12'>
                <i class='material-icons prefix third-text'>search</i>
                <input placeholder='Ingresa palabras clave' 
                  type='text' class='validate'
                  v-model:value="searchInput" />
                <label>Búsqueda de Usuarios</label>
              </div>
            </div>
            <ul class="collection scrollable-collection">
              <new-member-list-item
                v-for="user in filteredList"
                :selected="selectedBucket[user.idUsuario]"
                @remove-new-member="handleRemoveNewMember"
                @add-new-member="handleAddNewMember"
                :key="user.idUsuario"
                :user="user">
              </new-member-list-item>
            </ul>
          </div>
        </div>
      </form>
    </div>
  `
});

/*
<div class="row">
  <form class="col s12">
    <!-- Group Users Begin -->
    <div class="card">
      <div class="card-content">
        <div class="row">
          <div class='input-field col s12'>
            <i class='material-icons prefix third-text'>search</i>
            <input placeholder='Ingresa palabras clave' type='text' class='validate'>
            <label>Búsqueda de Usuarios</label>
          </div>
        </div>
        <ul class="collection scrollable-collection">
          <new-member-list-item
            v-for="user in users"
            :key="user.idUsuario"
            :user="user">
          </new-member-list-item>
        </ul>
      </div>
    </div>
    <!-- Group Users End -->
  </form>
</div>
*/