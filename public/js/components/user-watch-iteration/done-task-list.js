Vue.component('done-task-list', {
  props : ['tasks'],
  template : `
    <div class="col s12 m4 light-green lighten-4 scrollable-board">
      <div class="row">
        <div class="col s12">
          <div class="card">
            <div class="card-content">
              <span class="card-title first-text center">
                <b>DONE</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      <done-task-list-item 
        v-for="task in tasks"
        :key="task.idTarea"
        :task="task">
      </done-task-list-item>
    </div>
  `
});