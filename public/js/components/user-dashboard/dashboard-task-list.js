/*
  This component represents the task list at the user
  info section in the dashboard.
*/
Vue.component('dashboard-task-list', {
  props : [
    'user' // The user looking at the dashboard.
  ],
  data : function(){
    return {
      tasksInfo : [] // The tasks the user belongs to.
    };
  },
  created : function(){
    // TODO : Fetch the task info.
  },
  template : `
    <ul class="collection scrollable-collection">
      <li class="collection-item grey-color">
        <span>
          El usuario no ha realizado alguna tarea.
        </span>
      </li>
      <dashboard-task-list-item>
      </dashboard-task-list-item>
    </ul>
  `
});