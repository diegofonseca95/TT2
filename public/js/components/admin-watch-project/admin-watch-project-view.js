Vue.component('admin-watch-project-view', {
  data : function(){
    return {};
  },
  template : `
    <div class="row z-depth-5">
      <new-iteration-card>
      </new-iteration-card>
      <!-- Unassigned Tasks Placeholder -->
      <new-task-card>
      </new-task-card>
    </div>
  `
});