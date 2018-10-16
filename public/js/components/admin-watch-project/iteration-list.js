Vue.component('iteration-list', {
  props : ['iterations'],
  template : `
    <ul class="collection scrollable-collection">
      <li class="collection-item" 
        v-if="iterations.length === 0">
        <span>
          No hay iteraciones en el proyecto
        </span>
      </li>
      <iteration-list-item
        v-for="iteration in iterations"
        :key="iteration.idSprint"
        :iteration="iteration">
      </iteration-list-item>
    </ul>
  `
});