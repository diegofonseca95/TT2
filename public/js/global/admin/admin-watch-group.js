var AdminWatchGroupVue = new Vue({
  el : '#admin-watch-group-box',
  data : {
    users : [
      { // User Begin
        nombre : 'Jose María',
        apellidoPaterno : 'Morelos',
        apellidoMaterno : 'Y Pavón',
        correo : 'jose.maria@morelos.com',
        telefono : '5555555555'
      }, // User End
      { // User Begin
        nombre : 'Josefa',
        apellidoPaterno : 'Ortíz',
        apellidoMaterno : 'De Domínguez',
        correo : 'josefa@ortiz.com',
        telefono : '5566666666'
      }, // User End
      { // User Begin
        nombre : 'Jose Joaquín',
        apellidoPaterno : 'Fernández',
        apellidoMaterno : 'De Elizalde',
        correo : 'jose.joaquin@fernandez.com',
        telefono : '5577777777'
      } // User End
    ]
  }
});