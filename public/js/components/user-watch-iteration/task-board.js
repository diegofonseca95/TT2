Vue.component('task-board', {
  data : function(){
    return {
      tasks : [
        { idTarea : 0 },
        { idTarea : 1 },
        { idTarea : 2 },
        { idTarea : 3 }
      ]
    };
  },
  template : `
    <div class="row">
      <div class="col s12 page-background">
        <div class="card">
          <div class="card-content">
            <span class="card-title first-text center">
              <b>Tablero de trabajo</b>
            </span>
          </div>
        </div>
      </div>
      <todo-task-list :tasks="tasks">
      </todo-task-list>
      <doing-task-list :tasks="tasks">
      </doing-task-list>
      <done-task-list :tasks="tasks">
      </done-task-list>
    </div>
  `
});