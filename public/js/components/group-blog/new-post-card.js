// The settings for the JQuery form validation.
const NewPostCardFormValidateSettings = {
  rules : {
    'new-post-card-title-input' : {
      required : true
    }
    /*,
    'new-post-card-content-input' : {
      required : true
    }*/
  },
  messages : {
    'new-post-card-title-input' : {
      required : 'Ingresa el título de la publicación.'
    }
    /*,
    'new-post-card-content-input' : {
      required : 'Ingresa el contenido de la publicación.'
    }*/
  },
  errorPlacement : function(error, element){
    $(error).addClass('error-text');
    error.insertAfter(element);
  },
  errorElement : 'div'
};

const NewPostCardTinyMCESettings = {
  plugins : 'print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount tinymcespellchecker a11ychecker imagetools mediaembed  linkchecker contextmenu colorpicker textpattern help',
  toolbar1 : 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
  image_advtab : true,
  theme : 'modern',
  content_css : [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    '//www.tinymce.com/css/codepen.min.css'
  ]
};

/*
  This component represents the card to create a new group post
  in the group blog view.
*/
Vue.component('new-post-card', {
  props : [
    'selectedPost',  // The post to be edited.
    'editMode'
  ],
  data : function(){
    return {
      newPostContent : '',    // The content of the new post.
      newPostTitle : '',      // The title of the new post.
      hasValidFields : false  // To communicate Vue with JQuery Validate plugin.
    };
  },
  mounted : function(){
    var formSettings = NewPostCardFormValidateSettings;
    // Add the submit handler to tell our component the values are correct.
    formSettings.submitHandler = function(form){
      this.hasValidFields = true;
    }.bind(this);
    // Enable form validation.
    $('#new-post-card-form').validate(formSettings);
    M.updateTextFields();
    // Initialize editor.
    var editorSettings = NewPostCardTinyMCESettings;
    editorSettings.selector = '#new-post-card-content-input';
    tinymce.init(editorSettings);
    tinymce.get('new-post-card-content-input').setContent('');
  },
  methods : {
    handlePostSubmitted : function(){
      // Assume all fields as invalid.
      this.hasValidFields = false;
      // Validate the form.
      $('#new-post-card-form').submit();
      if(!tinymce.get('new-post-card-content-input').isDirty()){
        if(!this.editMode){
          WarningToast('Ingresa el contenido.');
          return;
        }
      }
      // If the form is valid, this should be true.
      if(this.hasValidFields){
        if(!this.editMode){
          this.submitNewPost();
        }else{
          this.updatePost();
        }
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
        contenido : tinymce.get('new-post-card-content-input').getContent(),
        idPublicacion : this.selectedPost.idPublicacion,
        titulo : this.newPostTitle,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Send the new post to the server.
      fetch('/editarPublicacion', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          var newPost = response.publicacion;
          newPost.author = this.selectedPost.author;
          newPost.permissions = response.permisos;
          this.$emit('post-updated', newPost);
          SuccessToast(response.result);
          this.resetFormFields();
        }else{
          WarningToast(response.result);
        }
      }.bind(this));
    },
    submitNewPost : function(){
      // Get the group id from the hidden input.
      var groupIdInput = document.querySelector('input[name="group-id"]');

      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = { 
        // contenido : this.newPostContent,
        contenido : tinymce.get('new-post-card-content-input').getContent(),
        idGrupo : groupIdInput.value,
        titulo : this.newPostTitle,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Send the new post to the server.
      fetch('/agregarPublicacion', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          var newPost = response.posti;
          newPost.permissions = response.permisos;
          newPost.author = response.autor;
          this.$emit('post-submitted', newPost);
          SuccessToast(response.result);
          this.resetFormFields();
        }else{
          WarningToast(response.result);
        }
      }.bind(this));
    },
    resetFormFields : function(){
      // Reset component values.
      this.newPostContent = '';
      this.newPostTitle = '';
      // Recompute the size of the text areas.
      var form = document.querySelector('#new-post-card-form');
      // Reset the form.
      form.reset();
      form.querySelectorAll('textarea')
      .forEach(area => {
        M.textareaAutoResize(area);
      });
      tinymce.get('new-post-card-content-input').setContent('');
      M.updateTextFields();
    },
    handleCancelEditing : function(){
      this.$emit('edit-cancelled');
    }
  },
  watch : {
    selectedPost : function(){
      // Update the values accordingly.
      this.newPostContent = this.selectedPost.contenido;
      this.newPostTitle = this.selectedPost.titulo;
      // Recompute the size of the text areas.
      var textarea = document.querySelector(
        '#new-post-card-title-input'
      );
      textarea.value = this.selectedPost.titulo;
      M.textareaAutoResize(textarea);
      M.updateTextFields();
      tinymce.get(
        'new-post-card-content-input'
      ).setContent(this.selectedPost.contenido);
    }
  },
  computed : {
    cardTitle : function(){
      if(this.editMode) return 'Editar Publicación';
      return 'Nueva Publicación';
    },
    buttonLabel : function(){
      if(this.editMode) return 'Editar';
      return 'Publicar';
    }
  },
  template : `
    <div class="row zero-margin-bottom" id="new-post-card">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title first-text">
              <b>{{ cardTitle }}</b>
            </span>
            <div class="row">
              <form class="col s12" id="new-post-card-form">
                <div class="row">
                  <div class="input-field col s12">
                    <textarea class="materialize-textarea"
                      name="new-post-card-title-input"
                      id="new-post-card-title-input"
                      v-model:value="newPostTitle"></textarea>
                    <label for="new-post-card-title-input">
                      Título de la Publicación
                    </label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s12">
                    <textarea class="materialize-textarea"
                      name="new-post-card-content-input"
                      id="new-post-card-content-input"></textarea>
                  </div>
                </div>
              </form>
            </div>
            <div class="row">
              <div class="col s12">
                <a class="btn remove-button-background right"
                  href="#!" title="Agregar Publicación"
                  @click="handlePostSubmitted">
                  {{ buttonLabel }}
                </a>
                <a class="btn remove-button-background low-margin-right right"
                  href="#!" title="Cancelar" v-if="editMode"
                  @click="handleCancelEditing">
                  Cancelar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});