Vue.component('user-personal-info-card', {
  data : function(){
    return {
      user : {}
    };
  },
  beforeCreate : function(){
    // TODO : Fetch the user info.
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
      <edit-user-info-modal :user="user">
      </edit-user-info-modal>
    </div>
  `
});