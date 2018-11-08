Vue.component('user-personal-info-card', {
  data : function(){
    return {
      user : {}
    };
  },
  beforeCreate : function(){
    var userInput = document.querySelector('input[name="user-id"]');
    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      idUsuario : userInput.value,
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the user personal info.
    fetch('/obtenerUsuario', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.user = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  methods : {
    handleUserUpdated : function(updatedUser){
      this.user = updatedUser;
    }
  },
  template : `
    <div class="card">
      <div class="card-content">
        <ul class="collection remove-border">
          <li class="collection-item avatar">
            <i class="material-icons circle third-background">person</i>
            <div class="row">
              <span class="card-title first-text col s12 m11">
                <b>
                  <user-full-name-span :user="user">
                  </user-full-name-span>
                </b>
              </span>
              <span class="col s12 m11">
                Correo : {{ user.correo }}
              </span>
              <span class="col s12 m11">
                Teléfono : {{ user.telefono }}
              </span>
              <div class="col s12 m1">
                <button class="btn-floating btn-large modal-trigger remove-button-background right"
                  title="Ajustes" data-target="edit-user-info-modal">
                  <i class="material-icons">settings</i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <edit-user-info-modal 
        @user-updated="handleUserUpdated"
        :user="user">
      </edit-user-info-modal>
    </div>
  `
});