/*
  This component represents a group post
  in the group blog view.
*/
Vue.component('group-post', {
  props : [
    'post'  // The post represented by the component.
  ],
  mounted : function(){
    // Initialize the options dropdown.
    if(this.hasOptions){
      M.Dropdown.init(
        document.getElementById(this.triggerId),
        { alignment : 'right', constrainWidth : false }
      );
    }
    console.log({this.post.idPublicacion : this.post.permissions});
  },
  computed : {
    dropdownId : function(){
      // The dropdown id.
      return 'group-post-dropdown-' + this.post.idPublicacion;
    },
    triggerId : function(){
      // The trigger id.
      return 'group-post-trigger-' + this.post.idPublicacion;
    },
    hasOptions : function(){
      return this.post.permissions.eliminar 
        || this.post.permissions.editar
        || this.post.permissions.aprobar
        || this.post.permissions.rechazar;
    }
  },
  methods : {
    handlePostAccepted : function(){
      // TODO : Accept post in server.
      this.$emit('post-accepted', this.post);
    },
    handlePostRejected : function(){
      // TODO : Reject post in server.
      this.$emit('post-rejected', this.post);
    },
    handlePostSelected : function(){
      this.$emit('post-selected', this.post);
    },
    handlePostDeleted : function(){
      // TODO : Delete post in server.
      this.$emit('post-deleted', this.post);
    }
  },
  template : `
    <div class="row zero-margin-bottom">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <span class="card-title">
                {{ post.titulo }}
                <a href='#!' class="right">
                  <i class="dropdown-trigger material-icons" 
                    :data-target="dropdownId" 
                    v-if="hasOptions"
                    title="Opciones"
                    :id="triggerId">more_vert</i>
                </a>
                <i class="material-icons right" 
                  title="Pendiente de validar"
                  v-if="post.estadoPublicacion === 2">timer</i>
                <i class="material-icons right" 
                  title="Publicación rechazada"
                  v-if="post.estadoPublicacion === 3">close</i>
              </span>
              <span class="col s12">
                Autor: 
                <user-full-name-span :user="post.author">
                </user-full-name-span>
              </span>
              <span class="col s12">
                Publicado el: {{ post.fechaCreacion }}
              </span>
            </div>
            <div class="row zero-margin">
              <span class="col s12">
                {{ post.contenido }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <ul :id="dropdownId" class="dropdown-content" 
        v-if="hasOptions">
        <li v-if="post.permissions.aprobar">
          <a href="#!" @click="handlePostAccepted">
            <i class="material-icons">check</i>Validar publicación
          </a>
        </li>
        <li v-if="post.permissions.rechazar">
          <a href="#!" @click="handlePostRejected">
            <i class="material-icons">close</i>Rechazar publicación
          </a>
        </li>
        <li v-if="post.permissions.editar">
          <a href="#!" @click="handlePostSelected">
            <i class="material-icons">edit</i>Editar publicación
          </a>
        </li>
        <li v-if="post.permissions.eliminar">
          <a href="#!" @click="handlePostDeleted">
            <i class="material-icons">close</i>Eliminar publicación
          </a>
        </li>
      </ul>
    </div>
  `
});