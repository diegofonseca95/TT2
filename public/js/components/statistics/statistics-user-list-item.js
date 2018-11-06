/*
  This component represents an item in the user list
  in the statistics view.
*/
Vue.component('statistics-user-list-item', {
  props : [
    'user' // The user information for this item.
  ],
  methods : {
    handleUserSelected : function(){
      // Tell the parent this user has been selected.
      this.$emit('user-selected', this.user);
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">person</i>
      <div class="row">
        <div class="col s12 m9">
          <span class="title truncate col s12">
            <user-full-name-span :user="user">
            </user-full-name-span>
          </span>
          <span class="truncate col s12">
            Correo: {{ user.correo }}
          </span>
          <span class="truncate col s12">
            Número: {{ user.telefono }}
          </span>
        </div>
        <div class="col s12 m3">
          <label class="right">
            <button class="btn remove-button-background" 
              title="Ver estadísticas"
              @click="handleUserSelected">
              <i class="material-icons">remove_red_eye</i>
            </button>
          </label>
        </div>
      </div>
    </li>
  `
});