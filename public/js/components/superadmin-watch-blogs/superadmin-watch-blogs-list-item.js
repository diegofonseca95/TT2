Vue.component('superadmin-watch-blogs-list-item', {
  props : [
    'blog'
  ],
  computed : {
    blogLink : function(){
      return '/publicacionesGrupo/' + this.blog.idGrupo;
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">library_books</i>
      <div class="row">
        <span class="title truncate col s12 hide-on-small-only">
          {{ blog.nombreGrupo }}
        </span>
        <span class="truncate col s12 hide-on-small-only">
          {{ blog.descripcion }}
        </span>
        <div class="right">
          <a class="btn remove-button-background" 
            title="Ver blog"
            :href="blogLink">
            <i class="material-icons">remove_red_eye</i>
          </a>
        </div>
      </div>
    </li>
  `
});