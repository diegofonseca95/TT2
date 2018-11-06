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
    M.Dropdown.init(
      document.getElementById(this.triggerId),
      { alignment : 'right', constrainWidth : false }
    );
  },
  computed : {
    dropdownId : function(){
      // The dropdown id.
      return 'group-post-dropdown-' + this.post.idPublicacion;
    },
    triggerId : function(){
      // The trigger id.
      return 'group-post-trigger-' + this.post.idPublicacion;
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
                Título de la publicación
                <a href='#!' class="right">
                  <i class="dropdown-trigger material-icons" 
                    :data-target="dropdownId" 
                    title="Opciones"
                    :id="triggerId">more_vert</i>
                </a>
                <i class="material-icons right" 
                  title="Pendiente de validar">timer</i>
                <i class="material-icons right" 
                  title="Publicación rechazada">close</i>
              </span>
              <span class="col s12">
                Autor: 
                <user-full-name-span :user="{}">
                </user-full-name-span>
              </span>
              <span class="col s12">
                Publicado el: 25 / 10 / 2018
              </span>
            </div>
            <div class="row zero-margin">
              <span class="col s12">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut nibh ultricies, pellentesque diam
                nec, vehicula ipsum. Integer id vulputate tortor. Nullam eget mi in est pellentesque cursus.
                Curabitur pharetra nisi sit amet fermentum consectetur. Curabitur egestas dapibus velit a
                consequat. Integer dictum nulla ipsum, consequat faucibus sapien mollis eu. Vestibulum luctus
                lectus erat, nec porta nunc eleifend ut. Sed mauris nisl, viverra ac ante quis, consequat sodales
                elit. Etiam faucibus erat lacus, at tempus ipsum dapibus sed. Nunc malesuada velit ac risus rutrum
                mattis. Vivamus scelerisque eu nibh vitae elementum.
              </span>
            </div>
          </div>
        </div>
      </div>
      <ul :id="dropdownId" class="dropdown-content">
        <li>
          <a href="#!" @click="handlePostAccepted">
            <i class="material-icons">check</i>Validar publicación
          </a>
        </li>
        <li>
          <a href="#!" @click="handlePostRejected">
            <i class="material-icons">close</i>Rechazar publicación
          </a>
        </li>
        <li>
          <a href="#!" @click="handlePostSelected">
            <i class="material-icons">edit</i>Editar publicación
          </a>
        </li>
        <li>
          <a href="#!" @click="handlePostDeleted">
            <i class="material-icons">close</i>Eliminar publicación
          </a>
        </li>
      </ul>
    </div>
  `
});