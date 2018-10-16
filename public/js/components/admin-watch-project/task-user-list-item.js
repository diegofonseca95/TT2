Vue.component('task-user-list-item', {
  props : ['member'],
  methods : {
    handleChange : function(){
      if(event.returnValue){
        this.$emit('task-user-chosen', this.member);
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
            <input name="task-user-list-input" 
              @change="handleChange"
              type="radio" />
            <span>Asignar</span>
          </label>
        </div>
      </div>
    </li>
  `
});