Vue.component('user-info-task-list', {
  props : ['user'],
  data : function(){
    return {
      userTasksInfo : [ 
        { key : 0 },
        { key : 1 },
        { key : 2 }
      ]
    };
  },
  watch : {
    user : function(){
      // TODO : Fetch the tasks completed by the user.
    }
  },
  template : `
    <ul class="collection scrollable-collection">
      <user-info-task-list-item
        v-for="taskInfo in userTasksInfo"
        :task-info="taskInfo"
        :key="taskInfo.key">
      </user-info-task-list-item>
      <li class="collection-item"
        v-if="userTasksInfo.length === 0">
        El usuario no ha completado alguna tarea.
      </li>
    </ul>
  `
});

/*
<ul class="collection scrollable-collection">
  <user-info-task-list-item
    v-for="taskInfo in userTasksInfo"
    :task-info="taskInfo"
    :key="taskInfo.key">
  </user-info-task-list-item>
</ul>
*/