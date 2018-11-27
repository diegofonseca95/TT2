Vue.component('shared-files-group-list-item', {
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
        <span class="title truncate col s12 hide-on-small-only">
          {{ groupInfo.nombreGrupo }}
        </span>
        <span class="col s12 hide-on-small-only"
          style="word-break: break-all;">
          {{ groupInfo.descripcion }}
        </span>
        <div class="col s12">
          <button class="btn remove-button-background right" 
            title="Ver archivos"
            @click="handleGroupSelected">
            <i class="material-icons">remove_red_eye</i>
          </button>
        </div>
      </div>
    </li>
  `
}); 