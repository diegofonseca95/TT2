Vue.component('iteration-list', {
  data : function(){
    return {
      iterations : []
    };
  },
  beforeCreate : function(){
    // TODO : Fetch iteration list.
  },
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