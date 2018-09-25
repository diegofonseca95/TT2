var AdminWatchGroupVue = new Vue({
  el : '#admin-watch-group-box',
  data : {
    users : [
      { // User Begin
        idUsuario : 0,
        nombre : 'Jose María',
        apellidoPaterno : 'Morelos',
        apellidoMaterno : 'Y Pavón',
        correo : 'jose.maria@morelos.com',
        telefono : '5555555555'
      }, // User End
      { // User Begin
        idUsuario : 1,
        nombre : 'Josefa',
        apellidoPaterno : 'Ortíz',
        apellidoMaterno : 'De Domínguez',
        correo : 'josefa@ortiz.com',
        telefono : '5566666666'
      }, // User End
      { // User Begin
        idUsuario : 2,
        nombre : 'Jose Joaquín',
        apellidoPaterno : 'Fernández',
        apellidoMaterno : 'De Elizalde',
        correo : 'jose.joaquin@fernandez.com',
        telefono : '5577777777'
      } // User End
    ]
  },
  beforeCreate : function(){
    var authToken = document.querySelector('input[name="_token"]');
    var groupId = document.querySelector('input[name="group-id"]');
    //alert(authToken.value);
    //alert(groupId.value);
    var requestData = {
      _token : authToken
    };
    fetch('/obtenerUsuariosActivos', {
      body : requestData,
      method : 'POST'
    })
    .then(responseData => responseData.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.users = response;
      }
    }.bind(this));
  }
});