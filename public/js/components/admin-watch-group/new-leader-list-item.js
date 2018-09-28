Vue.component('new-leader-list-item', {
  props : ['member','isChecked'],
  data : function(){
    return {};
  },
  computed : {
    memberFullName : function(){
      var fullName = this.member.nombre;
      if(this.member.apellidoPaterno !== ''){
        fullName += ' ' + this.member.apellidoPaterno;
      }
      if(this.member.apellidoMaterno !== ''){
        fullName += ' ' + this.member.apellidoMaterno;
      }
      return fullName;
    }
  },
  methods : {
    handleChange : function(){
      if(event.returnValue){
        this.$emit('new-leader-chosen', this.member.idUsuario);
      }
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">person</i>
      <div class="row">
        <div class="col s12 m9">
          <span class="title truncate col s12">{{ memberFullName }}</span>
          <span class="title truncate col s12">Correo : {{ member.correo }}</span>
          <span class="title truncate col s12">Teléfono : {{ member.telefono }}</span>
        </div>
        <div class="col s12 m3">
          <label class="right">
            <input name="new-leader-list-input" 
              @change="handleChange"
              :checked="isChecked"
              type="radio" />
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
      <span class="title truncate col s12">{{ memberFullName }}</span>
      <span class="title truncate col s12">Correo : {{ member.correo }}</span>
      <span class="title truncate col s12">Teléfono : {{ member.telefono }}</span>
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