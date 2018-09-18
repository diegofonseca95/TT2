Vue.component('group-member-list-item', {
  props : ['member'],
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
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">person</i>
      <div class="row">
        <span class="title truncate col s12 hide-on-small-only">
          {{ memberFullName }}
        </span>
        <span class="title truncate col s12 hide-on-med-and-up">
          {{ member.nombre }}
        </span>
        <p class="truncate col s12">
          Correo : {{ member.correo }}<br>
          Teléfono : {{ member.telefono }}
        </p>
        <div class="right">
          <a class="btn remove-button-background"
            href="#!" title="Eliminar">
            <i class="material-icons">remove</i>
          </a>
          <button class="btn modal-trigger remove-button-background"
            title="Ver" data-target="modal_userInfo">
            <i class="material-icons">remove_red_eye</i>
          </button>
          <a class="btn remove-button-background"
            href="#!" title="Contactar">
            <i class="material-icons">send</i>
          </a>
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
    <span class="title truncate col s12 hide-on-small-only">
      {{ memberFullName }}
    </span>
    <span class="title truncate col s12 hide-on-med-and-up">
      {{ member.nombre }}
    </span>
    <p class="truncate col s12">
      Correo : {{ member.correo }}<br>
      Teléfono : {{ member.telefono }}
    </p>
    <div class="right">
      <a href="#!" title="Eliminar" class="btn remove-button-background">
        <i class="material-icons">remove</i>
      </a>
      <button title="Ver" data-target="modal_userInfo" class="btn modal-trigger remove-button-background">
        <i class="material-icons">remove_red_eye</i>
      </button>
      <a href="#!" title="Contactar" class="btn remove-button-background">
        <i class="material-icons">send</i>
      </a>
    </div>
  </div>
</li>
<!-- User Ends -->
*/