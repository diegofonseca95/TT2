Vue.component('project-member-list-item', {
  props : ['member'],
  data : function(){
    return {};
  },
  methods : {
    removeMember : function(){
      this.$emit('member-removed', this.member);
    },
    observeMember : function(){
      this.$emit('member-selected', this.member);
    },
    messageMember : function(){
      // TODO : Add functionality when chat is working.
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">person</i>
      <div class="row">
        <span class="title truncate col s12 hide-on-small-only">
          <user-full-name-span :user="member">
          </user-full-name-span>
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
            href="#!" title="Eliminar"
            @click="removeMember">
            <i class="material-icons">remove</i>
          </a>
          <button class="btn modal-trigger remove-button-background"
            title="Ver" data-target="user-info-modal"
            @click="observeMember">
            <i class="material-icons">remove_red_eye</i>
          </button>
          <a class="btn remove-button-background"
            href="#!" title="Contactar"
            @click="messageMember">
            <i class="material-icons">send</i>
          </a>
        </div>
      </div>
    </li>
  `
});