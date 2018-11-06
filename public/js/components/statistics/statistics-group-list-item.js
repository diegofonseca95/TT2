/*
  This component represents an item in the group list
  in the statistics view.
*/
Vue.component('statistics-group-list-item', {
  props : [
    'groupInfo' // The group information for this item.
  ],
  methods : {
    handleGroupSelected : function(){
      // Tell the parent this group has been selected.
      this.$emit('group-selected', this.groupInfo);
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">group</i>
      <div class="row">
        <div class="col s12 m9">
          <span class="title truncate col s12">
            Nombre del grupo
          </span>
          <span class="truncate col s12">
            Líder del grupo
          </span>
        </div>
        <div class="col s12 m3">
          <label class="right">
            <button class="btn remove-button-background" 
              title="Ver estadísticas"
              @click="handleGroupSelected">
              <i class="material-icons">remove_red_eye</i>
            </button>
          </label>
        </div>
      </div>
    </li>
  `
});