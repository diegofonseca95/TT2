/*
  This component represents the statistics view.
*/
Vue.component('statistics-category-tab-strip', {
  methods : {
    handleProjectsSelected : function(){
      this.$emit('strip-selected', {
        projects : true,
        groups : false,
        users : false
      });
    },
    handleGroupsSelected : function(){
      this.$emit('strip-selected', {
        projects : false,
        groups : true,
        users : false
      });
    },
    handleUsersSelected : function(){
      this.$emit('strip-selected', {
        projects : false,
        groups : false,
        users : true
      });
    }
  },
  template : `
    <div class="col s12">
      <ul id="statistics-category-tab-strip"
        class="tabs">
        <li class="tab col s12 m4">
          <a href="#groups-view"
            @click="handleGroupsSelected">
            Estadísticas de Grupos
          </a>
        </li>
        <li class="tab col s12 m4">
          <a href="#projects-view"
            @click="handleProjectsSelected">
            Estadísticas de Proyectos
          </a>
        </li>
        <li class="tab col s12 m4">
          <a href="#users-view"
            @click="handleUsersSelected">
            Estadísticas de Usuarios
          </a>
        </li>
      </ul>
    </div>
  `
});