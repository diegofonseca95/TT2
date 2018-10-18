/*
  This component represents the project list at the user
  info section in the dashboard.
*/
Vue.component('dashboard-project-list', {
  props : [
    'user' // The user looking at the dashboard.
  ],
  data : function(){
    return {
      projectsInfo : [] // The projects the user belongs to.
    };
  },
  created : function(){
    // TODO : Fetch the project info.
  },
  template : `
    <ul class="collection scrollable-collection">
      <li class="collection-item grey-color">
        <span>
          El usuario no ha participado en algún proyecto.
        </span>
      </li>
      <dashboard-project-list-item>
      </dashboard-project-list-item>
    </ul>
  `
});