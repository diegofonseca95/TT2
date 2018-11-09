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
    handleTaskBegun : function(begTask){
      this.todo = this.todo.filter(
        taskId => taskId !== begTask.tarea.idTarea
      );
      if(!this.doing.includes(begTask.tarea.idTarea)){
        this.doing.push(begTask.tarea.idTarea);
      }
      this.tasks = this.tasks.map(task => {
        if(task.tarea.idTarea !== begTask.tarea.idTarea){
          return task;
        } 
        return begTask;
      });
      console.log(begTask);
    },
    handleDeliverableApproved : function(apTask){
      this.doing = this.doing.filter(
        taskId => taskId !== apTask.tarea.idTarea
      );
      if(!this.done.includes(apTask.tarea.idTarea)){
        this.done.push(apTask.tarea.idTarea);
      }
      this.tasks = this.tasks.map(task => {
        if(task.tarea.idTarea !== apTask.tarea.idTarea){
          return task;
        } 
        return apTask;
      });
      console.log(apTask);
    },
    handleTaskUpdated : function(updTask){
      this.tasks = this.tasks.map(task => {
        if(task.tarea.idTarea !== updTask.tarea.idTarea){
          return task;
        } 
        return updTask;
      });
      console.log(updTask);
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
        @deliverable-approved="handleDeliverableApproved"
        @task-updated="handleTaskUpdated"
        :tasks="doingTaskList">
      </doing-task-list>
      <done-task-list
        :tasks="doneTaskList">
      </done-task-list>
    </div>
  `
});