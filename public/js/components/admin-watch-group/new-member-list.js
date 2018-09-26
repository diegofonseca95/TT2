Vue.component('new-member-list', {
  props : ['users'],
  data : function(){
    return {
      selectedBucket : {},
      searchInput : ''
    };
  },
  computed : {
    filteredList : function(){
      const tokens = this.searchInput.split(' ').filter(Boolean);
      return this.users.filter(user => {
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
      });
    }
  },
  watch : {
    users : function(){
      this.selectedBucket = {};
      for(var x in this.users){
        this.selectedBucket[this.users[x].idUsuario] = false;
      }   
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
                :is-selected="selectedBucket[user.idUsuario]"
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