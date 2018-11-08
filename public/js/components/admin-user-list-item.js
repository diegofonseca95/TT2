Vue.component('admin-user-list-item', {
  props : ['user'],
  data : function(){
    return {
      deleted : false
    };
  },
  methods : {
    approveUser : function(event){
      console.log(authToken);
      $.ajax({
        url : '/validarUsuario',
        method : 'POST',
        data : {
          idUsuario : this.user.idUsuario,
          _token : authToken
        }
      }).done(function(response){
        if(!response.hasOwnProperty('status'))
          return;
        if(response.status === 'OK'){
          SuccessToast(response.result);
          this.user.valid = true;
        }
        if(response.status === 'ERROR')
          ErrorToast(response.result);
      }.bind(this));
    },
    deleteUser : function(event){
      $.ajax({
        url : '/eliminarUsuario',
        method : 'POST',
        data : {
          idUsuario : this.user.idUsuario,
          _token : authToken
        }
      }).done(function(response){
        if(!response.hasOwnProperty('status'))
          return;
        if(response.status === 'OK'){
          SuccessToast(response.result);
          this.deleted = true;
        }
        if(response.status === 'ERROR')
          ErrorToast(response.result);
      }.bind(this));
    },
    observeMember : function(){
      this.$emit('member-selected', this.user);
    }
  },
  computed : {
    fullName : function(){
      return this.user.nombre 
      + ' ' + this.user.apellidoPaterno
      + ' ' + this.user.apellidoMaterno;
    }
  },
  template :`
    <li class='collection-item avatar' v-if='!deleted'>
      <i class='material-icons circle third-background'>person</i>
      <div class='row'>
        <span class='title truncate col s12 hide-on-small-only'>
          {{ fullName }}
        </span>
        <span class='title truncate col s12 hide-on-med-and-up'>
          {{ user.nombre }}
        </span>
        <p class='truncate col s12'>
          Correo : {{ user.correo }}
          <br>
          Teléfono : {{ user.telefono }}
        </p>
        <div class='col s12'>
          <div class='col s4 offset-s2 m2 offset-m8 l3 offset-l5'>
            <a href='#!' class='btn red' title='Eliminar'
              @click='deleteUser'>
              <i class='material-icons'>close</i>
            </a>
          </div>
          <div class='col s4 offset-s2 m2 l3 offset-l1'>
            <a href='#!' class='btn light-green accent-4'
              title='Aprobar' v-if='!user.valid' 
              @click='approveUser'>
              <i class='material-icons'>check</i>
            </a>
            <a href='#!' class='btn light-blue darken-2' 
              title='Ver' v-if='user.valid' 
              @click='observeMember'>
              <i class='material-icons'>remove_red_eye</i>
            </a>
          </div>
        </div>
      </div>
    </li>
  `
});