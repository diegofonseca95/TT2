Vue.component('new-post-card', {
  data : function(){
    return {
      newPostContent : '',
      newPostTitle : ''
    };
  },
  mounted : function(){
    $('#new-post-card-form').validate({
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
      errorElement : 'div',
      errorPlacement : function(error, element){
        $(error).addClass('error-text');
        error.insertAfter(element);
      },
      submitHandler : function(form){
        this.hasValidFields = true;
      }.bind(this)
    });
  },
  methods : {
    handlePostSubmitted : function(){
      // TODO : Validate and submit.
      $('#new-post-card-form').submit();
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
                      id="new-post-card-title-input"></textarea>
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