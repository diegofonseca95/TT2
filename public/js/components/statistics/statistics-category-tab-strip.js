/*
  This component represents the statistics view.
*/
Vue.component('statistics-category-tab-strip', {
  template : `
    <div class="col s12">
      <ul id="statistics-category-tab-strip"
        class="tabs">
        <li class="tab col s12 m4">
          <a href="#groups-view">
            Estadísticas de Grupos
          </a>
        </li>
        <li class="tab col s12 m4">
          <a href="#projects-view">
            Estadísticas de Proyectos
          </a>
        </li>
        <li class="tab col s12 m4">
          <a href="#users-view">
            Estadísticas de Usuarios
          </a>
        </li>
      </ul>
    </div>
  `
});