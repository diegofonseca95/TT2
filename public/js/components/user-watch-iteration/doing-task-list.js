Vue.component('doing-task-list', {
  props : ['tasks'],
  template : `
    <div class="col s12 m4 amber lighten-4 scrollable-board">
      <div class="row">
        <div class="col s12">
          <div class="card">
            <div class="card-content">
              <span class="card-title first-text center">
                <b>DOING</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      <doing-task-list-item 
        v-for="task in tasks"
        :key="task.idTarea"
        :task="task">
      </doing-task-list-item>
      <div class="row zero-margin-bottom"
        v-if="tasks.length === 0">
        <div class="col s12">
          <div class="card">
            <div class="card-content">
              No hay tareas en curso.
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});