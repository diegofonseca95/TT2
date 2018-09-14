Vue.component('new-leader-list-item', {
  props : ['user'],
  data : function(){
    return {};
  },
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
  methods : {
    handleChange : function(event){
      if(event.returnValue){
        this.$emit('leader-chosen', this.user);
      }
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">person</i>
      <div class="row">
        <div class="col s12 m9">
          <span class="title truncate col s12">{{ userFullName }}</span>
          <span class="title truncate col s12">Correo : {{ user.correo }}</span>
          <span class="title truncate col s12">Teléfono : {{ user.telefono }}</span>
        </div>
        <div class="col s12 m3">
          <label class="right">
            <input name="new-leader-list-input" type="radio" @change="handleChange"/>
            <span>Líder</span>
          </label>
        </div>
      </div>
    </li>
  `
});

/*
<!-- User Begins -->
<li class="collection-item avatar">
  <i class="material-icons circle third-background">person</i>
  <div class="row">
    <div class="col s12 m9">
      <span class="title truncate col s12">{{ userFullName }}</span>
      <span class="title truncate col s12">Correo : {{ user.correo }}</span>
      <span class="title truncate col s12">Teléfono : {{ user.telefono }}</span>
    </div>
    <div class="col s12 m3">
      <label class="right">
        <input name="new-leader-list-input" type="radio" @change="handleChange"/>
        <span>Líder</span>
      </label>
    </div>
  </div>
</li>
<!-- User Ends -->
*/