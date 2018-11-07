// The settings for the JQuery form validation.
const EditGroupPostModalFormValidateSettings = {
  rules : {
    'edit-group-post-modal-title-input' : {
      required : true
    },
    'edit-group-post-modal-content-input' : {
      required : true
    }
  },
  messages : {
    'edit-group-post-modal-title-input' : {
      required : 'Ingresa el título de la publicación.'
    },
    'edit-group-post-modal-content-input' : {
      required : 'Ingresa el contenido de la publicación.'
    }
  },
  errorPlacement : function(error, element){
    $(error).addClass('error-text');
    error.insertAfter(element);
  },
  errorElement : 'div'
};

/*
  This component represents the edit post modal
  in the group blog view.
*/
Vue.component('edit-group-post-modal', {
  props : [
    'post'  // The post to be edited.
  ],
  data : function(){
    return {
      newPostContent : this.post.contenido, // The new content of the post.
      newPostTitle : this.post.titulo,      // The new title of the post.
      hasValidFields : false                // To communicate Vue with JQuery Validate plugin.
    };
  },
  mounted : function(){
    // Initialize the modal.
    M.Modal.init(
      document.querySelector('#edit-group-post-modal')
    );
    var formSettings = EditGroupPostModalFormValidateSettings;
    // Add the submit handler to tell our component the values are correct.
    formSettings.submitHandler = function(form){
      this.hasValidFields = true;
    }.bind(this);
    // Enable form validation.
    $('#edit-group-post-modal-form').validate(formSettings);
  },
  methods : {
    handlePostUpdated : function(){
      // Assume all fields as invalid.
      this.hasValidFields = false;
      // Validate the form.
      $('#edit-group-post-modal-form').submit();
      // If the form is valid, this should be true.
      if(this.hasValidFields){
        this.updatePost();
      }
    },
    updatePost : function(){
      // Get the group id from the hidden input.
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        idPublicacion : this.post.idPublicacion,
        contenido : this.newPostContent,
        titulo : this.newPostTitle,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Send the new post to the server.
      fetch('/editarPublicacion', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          var newPost = response.posti;
          newPost.permissions = response.permisos;
          newPost.author = response.autor;
          this.$emit('post-updated', newPost);
          SuccessToast(response.result);
        }else{
          WarningToast(response.result);
        }
      }.bind(this));
      this.resetFormFields();
    },
    resetFormFields : function(){
      // Reset component values.
      this.newPostContent = '';
      this.newPostTitle = '';
      // Recompute the size of the text areas.
      var form = document.querySelector('#edit-group-post-modal-form');
      // Reset the form.
      form.reset();
      form.querySelectorAll('textarea')
      .forEach(area => {
        M.textareaAutoResize(area);
      });
      M.updateTextFields();
    }
  },
  watch : {
    post : function(){
      // Update the values accordingly.
      this.newPostContent = this.post.contenido;
      this.newPostTitle = this.post.titulo;
      // Recompute the size of the text areas.
      var textarea = document.querySelector(
        '#edit-group-post-modal-title-input'
      );
      textarea.value = this.post.titulo;
      M.textareaAutoResize(textarea);
      textarea = document.querySelector(
        '#edit-group-post-modal-content-input'
      );
      textarea.value = this.post.contenido;
      M.textareaAutoResize(textarea);
      M.updateTextFields();
    }
  },
  template : `
    <div id="edit-group-post-modal" class="modal">
      <div class="modal-content">
        <h4>Editar publicación</h4>
        <div class="row">
          <div class="row">
            <form class="col s12" id="edit-group-post-modal-form">
              <div class="row">
                <div class="input-field col s12">
                  <textarea class="materialize-textarea"
                    name="edit-group-post-modal-title-input"
                    id="edit-group-post-modal-title-input"
                    v-model:value="newPostTitle"></textarea>
                  <label for="edit-group-post-modal-title-input">
                    Título de la Publicación
                  </label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <textarea class="materialize-textarea"
                    name="edit-group-post-modal-content-input"
                    id="edit-group-post-modal-content-input"
                    v-model:value="newPostContent"></textarea>
                  <label for="edit-group-post-modal-content-input">
                    Contenido de la Publicación
                  </label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn-flat">
          Cancelar
        </a>
        <a href="#!" class="waves-effect waves-green btn-flat"
          @click="handlePostUpdated">
          Listo
        </a>
      </div>
    </div>
  `
});