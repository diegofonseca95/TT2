// The settings for the JQuery form validation.
const NewPostCardFormValidateSettings = {
  rules : {
    'new-post-card-title-input' : {
      required : true
    },
    'new-post-card-content-input' : {
      required : true
    }
  },
  messages : {
    'new-post-card-title-input' : {
      required : 'Ingresa el título de la publicación.'
    },
    'new-post-card-content-input' : {
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
  This component represents the card to create a new group post
  in the group blog view.
*/
Vue.component('new-post-card', {
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
  },
  methods : {
    handlePostSubmitted : function(){
      // Assume all fields as invalid.
      this.hasValidFields = false;
      // Validate the form.
      $('#new-post-card-form').submit();
      // If the form is valid, this should be true.
      if(this.hasValidFields){
        this.submitNewPost();
      }
    },
    submitNewPost : function(){
      // TODO : Submit.
      console.log({
        content : this.newPostContent,
        title : this.newPostTitle
      });
      // this.$emit('post-submitted', POST_FROM_SERVER);
      this.resetFormFields();
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
      M.updateTextFields();
    }
  },
  template : `
    <div class="row zero-margin-bottom">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title first-text">
              <b>Nueva publicación</b>
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
                      id="new-post-card-content-input"
                      v-model:value="newPostContent"></textarea>
                    <label for="new-post-card-content-input">
                      Contenido de la Publicación
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div class="row">
              <div class="col s12">
                <a class="btn remove-button-background right"
                  href="#!" title="Agregar Publicación"
                  @click="handlePostSubmitted">
                  Publicar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});