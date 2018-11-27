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
          {{ project.nombreProyecto }}
        </span>
        <span class="col s12 hide-on-small-only"
          style="word-break: break-all;">
          {{ project.descripcion }}
        </span>
        <div class="col s12 m3">
          <label class="right">
            <button class="btn remove-button-background" 
              title="Ver archivos"
              @click="handleProjectSelected">
              <i class="material-icons">remove_red_eye</i>
            </button>
          </label>
        </div>
      </div>
    </li>
  `
}); 