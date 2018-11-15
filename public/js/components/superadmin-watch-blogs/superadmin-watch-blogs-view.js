Vue.component('superadmin-watch-blogs-view', {
  data : function(){
    return {
      searchInput : '',
      blogs : []
    };
  },
  beforeCreate : function(){
    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the blog list.
    fetch('/obtenerBlogs', requestData)
    .then(response => response.json())
    .then(function(response){
      console.log(response);
      if(response.status === 'OK'){
        this.blogs = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  computed : {
    filteredList : function(){
      // Split the search pattern into tokens.
      const tokens = this.searchInput.split(' ').filter(Boolean);
      // Filter the blogs that match.
      return this.blogs.filter(function(blog){
        // If there is no search pattern, include the blog.
        if(tokens.length == 0){
          return true;
        }
        // Check for all string fields in the blog info for a match.
        for(var i in tokens){
          const token = tokens[i];
          for(var key in blog){
            if(typeof blog[key] === 'string'){
              if(blog[key].includes(token)){
                return true;
              }
            }
          }
        }
        // The blog didn´t match any token in the pattern.
        return false;
      });  
    },
    noBlogMatches : function(){
      return this.filteredList.length === 0 
        && this.searchInput !== ''
        && this.blogs.length > 0;
    }
  },
  template : `
    <div class="row">
      <div class="card">
        <div class="card-content">
          <span class="card-title first-text">
            <b>Blogs</b>
          </span>
          <div class="row">
            <div class="col s12">
              <div class="input-field">
                <i class="material-icons prefix third-text">search</i>
                <input id="superadmin-watch-blogs-search-input"
                  placeholder="Ingresa palabras clave"
                  type="text" class="validate"
                  v-model:value="searchInput"/>
                <label for="superadmin-watch-blogs-search-input">
                  Búsqueda de Blogs
                </label>
              </div>
            </div>
          </div>
          <ul class="collection">
            <li class="collection-item"
              v-if="filteredList.length === 0">
              <span>
                No hay blogs que mostrar.
              </span>
            </li>
            <li class="collection-item"
              v-if="noBlogMatches">
              <span>
                No hay blogs que coincidan con el patrón de búsqueda.
              </span>
            </li>
            <superadmin-watch-blogs-list-item
              v-for="blog in filteredList"
              :key="blog.idGrupo"
              :blog="blog">
            </superadmin-watch-blogs-list-item>
          </ul>
        </div>
      </div>
      <chat-sidenav-view>
      </chat-sidenav-view>
    </div>
  `
});