Vue.component('iteration-list-item', {
  props : ['iteration'],
  methods : {
    handleWatchIteration : function(){
      // TODO : Redirect to the actual page.
    }
  },
  template : `
    <li class="collection-item avatar">
      <i class="material-icons circle third-background">call_made</i>
      <div class="row">
        <span class="title truncate col s12">
          Iteración {{ iteration.numeroSprint }}
        </span>
        <span class="title truncate col s12">
          Descripción
        </span>
        <span class="title truncate col s12">
          Fecha de inicio: {{ iteration.fecha_inicio }}
        </span>
        <span class="title truncate col s12">
          Fecha de término: {{ iteration.fecha_fin }}
        </span>
        <div class="right">
          <a class="btn remove-button-background"
            href="#!" title="Ver"
            @click="handleWatchIteration">
            <i class="material-icons">remove_red_eye</i>
          </a>
        </div>
      </div>
    </li>
  `
});