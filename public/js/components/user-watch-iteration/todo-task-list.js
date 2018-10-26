Vue.component('todo-task-list', {
  props : ['tasks'],
  template : `
    <div class="col s12 m4 light-blue lighten-4 scrollable-board">
      <div class="row">
        <div class="col s12">
          <div class="card">
            <div class="card-content">
              <span class="card-title first-text center">
                <b>TO DO</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      <todo-task-list-item 
        v-for="task in tasks"
        :key="task.idTarea"
        :task="task">
      </todo-task-list-item>
    </div>
  `
});