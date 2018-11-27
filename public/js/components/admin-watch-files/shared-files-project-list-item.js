/*
  This component represents an item in the project list
  in the files view.
*/
Vue.component('shared-files-project-list-item', {
  props : [
    'projectInfo' // The project information for this item.
  ],
  methods : {
    handleProjectSelected : function(){
      // Tell the parent this project has been selected.
      this.$emit('project-selected', this.projectInfo);
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">folder</i>
      <div class="row">
        <span class="title truncate col s12 hide-on-small-only">
          {{ projectInfo.nombreProyecto }}
        </span>
        <span class="col s12 hide-on-small-only"
          style="word-break: break-all;">
          {{ projectInfo.descripcion }}
        </span>
        <div class="col s12">
          <button class="btn remove-button-background right" 
            title="Ver archivos"
            @click="handleProjectSelected">
            <i class="material-icons">remove_red_eye</i>
          </button>
        </div>
      </div>
    </li>
  `
}); 