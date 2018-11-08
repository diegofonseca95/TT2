/*
  This component represents the group information card
  in the group blog view.
*/
Vue.component('blog-info-card', {
  data : function(){
    return {
      groupInfo : {}  // The group information.
    };
  },
  beforeCreate : function(){
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
      idGrupo : groupIdInput.value,
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the group information.
    fetch('/obtenerGrupo', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        var group = response.result.grupo;
        this.groupInfo = {
          description : group.descripcion,
          name : group.nombreGrupo,
          idGrupo : group.idGrupo
        };
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));

    // Fetch the group picture path.
    fetch('/nombrePortada', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        if(response.result !== ''){
          document.querySelector(
            '#blog-info-card-picture'
          ).src = response.result;
        }
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  methods : {
    triggerFileInput : function(){
      // Open the file picker from the hidden file input.
      var fileInput = document.querySelector(
        '#blog-info-card-file-input'
      );
      fileInput.value = '';
      fileInput.click();
    },
    sendFile : function(){
      var fileInput = document.querySelector(
        '#blog-info-card-file-input'
      );
      if(fileInput.value !== ''){
        var authToken = document.querySelector(
          'input[name="_token"]'
        );
        var file = fileInput.files[0];
        console.log(file);
        var data = new FormData();
        data.append('idGrupo', this.groupInfo.idGrupo);
        data.append('_token', authToken.value);
        data.append('fila', file);
        fetch('/subirPortada', {
          method : 'POST',
          body : data
        })
        .then(response => response.json())
        .then(function(response){
          if(response.status === 'OK'){
            SuccessToast(response.result);
            var reader = new FileReader();
            reader.onload = function(){
              document.querySelector(
                '#blog-info-card-picture'
              ).src = reader.result;
            };
            reader.readAsDataURL(file);
          }else{
            WarningToast(response.result);
          }
        }.bind(this));
      }
    }
  },
  template : `
    <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-image">
            <img src="/img/dummies/test.jpg"
              id="blog-info-card-picture">
            <span class="card-title">
              {{ groupInfo.name }}
            </span>
          </div>
          <div class="card-content">
            <p>
              {{ groupInfo.description }}
            </p>
            <br/>
            <div class="right">
              <button class="btn remove-button-background"
                @click="triggerFileInput"
                title="Cambiar foto">
                <i class="material-icons">photo_camera</i>
              </button>
              <button class="btn remove-button-background"
                title="Ver grupo">
                <i class="material-icons">remove_red_eye</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <input id="blog-info-card-file-input"
        type="file" class="hide" 
        @change="sendFile"/>
    </div>
  `
});