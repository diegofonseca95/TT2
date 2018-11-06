/*
  This component represents an item in the project list
  in the statistics view.
*/
Vue.component('statistics-project-list-item', {
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
        <div class="col s12 m9">
          <span class="title truncate col s12">
            Nombre del proyecto
          </span>
          <span class="truncate col s12">
            Líder del proyecto
          </span>
        </div>
        <div class="col s12 m3">
          <label class="right">
            <button class="btn remove-button-background" 
              title="Ver estadísticas"
              @click="handleProjectSelected">
              <i class="material-icons">remove_red_eye</i>
            </button>
          </label>
        </div>
      </div>
    </li>
  `
});