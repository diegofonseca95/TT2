Vue.component('blog-info-card', {
  data : function(){
    return {
      groupInfo : {}
    };
  },
  methods : {
    triggerFileInput : function(){
      document.getElementById('blog-info-card-file-input').click();
    }
    ,blabla : function(){
      var file = document.getElementById('blog-info-card-file-input').files[0]; 
      console.log(file);
      var reader = new FileReader();
      reader.onload = (function(theFile){
        return function(e){
          console.log(e.target.result);
        }
      })(file);
      reader.readAsDataURL(file);
    }
  },
  template : `
    <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-image">
            <img src="../../public/img/dummies/test.jpg">
            <span class="card-title">
              Nombre del grupo
            </span>
          </div>
          <div class="card-content">
            <p>
              Descripción del grupo
            </p>
            <br/>
            <div class="right">
              <button class="btn remove-button-background"
                @click="triggerFileInput"
                title="Cambiar foto">
                <i class="material-icons">photo_camera</i>
              </button>
              <button class="btn remove-button-background"
                title="Ver grupo" @click="blabla">
                <i class="material-icons">remove_red_eye</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <input id="blog-info-card-file-input"
        type="file" class="hide" />
    </div>
  `
});