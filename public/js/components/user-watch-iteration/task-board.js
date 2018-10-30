Vue.component('task-board', {
  data : function(){
    return {
      doing : [],
      tasks : [],
      todo : [],
      done : []
    };
  },
  beforeCreate : function(){
    // Get the iteration id from the hidden input.
    var iterationIdInput = document.querySelector('input[name="iteration-id"]');

    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      idSprint : iterationIdInput.value,
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the projects list.
    fetch('/obtenerTareasSprint', requestData)
    .then(response => response.json())
    .then(function(response){
      console.log(response.result);
      if(response.status === 'OK'){
        var taskInfo = [];
        for(var i in response.result){
          taskInfo.push(response.result[i]);
        }
        this.doing = response.doing;
        this.done = response.done;
        this.todo = response.todo;
        this.tasks = taskInfo;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  computed : {
    doingTaskList : function(){
      return this.tasks.filter(function(task){
        return this.doing.includes(task.tarea.idTarea);
      }.bind(this));
    },
    todoTaskList : function(){
      return this.tasks.filter(function(task){
        return this.todo.includes(task.tarea.idTarea);
      }.bind(this));
    },
    doneTaskList : function(){
      return this.tasks.filter(function(task){
        return this.done.includes(task.tarea.idTarea);
      }.bind(this));
    }
  },
  methods : {
    handleTaskBegun : function(task){
      this.todo = this.todo.filter(
        taskId => taskId !== task.idTarea
      );
      if(!this.doing.includes(task.idTarea)){
        this.doing.push(task.idTarea);
      }
    }
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
      <todo-task-list
        @task-begun="handleTaskBegun"
        :tasks="todoTaskList">
      </todo-task-list>
      <doing-task-list 
        :tasks="doingTaskList">
      </doing-task-list>
      <done-task-list
        :tasks="doneTaskList">
      </done-task-list>
    </div>
  `
});