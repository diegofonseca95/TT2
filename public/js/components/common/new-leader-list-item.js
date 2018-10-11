Vue.component('new-leader-list-item', {
  props : ['member','isChecked'],
  data : function(){
    return {};
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
          <span class="title truncate col s12">
            <user-full-name-span :user="member">
            </user-full-name-span>
          </span>
          <span class="title truncate col s12">
            Correo : {{ member.correo }}
          </span>
          <span class="title truncate col s12">
            Teléfono : {{ member.telefono }}
          </span>
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