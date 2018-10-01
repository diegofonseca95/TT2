Vue.component('user-full-name-span', {
  props : ['user'],
  computed : {
    userFullName : function(){
      var fullName = this.user.nombre;
      if(this.user.apellidoPaterno !== ''){
        fullName += ' ' + this.user.apellidoPaterno;
      }
      if(this.user.apellidoMaterno !== ''){
        fullName += ' ' + this.user.apellidoMaterno;
      }
      return fullName;
    }
  },
  template : `
    <span>
      {{ userFullName }}
    </span>
  `
});