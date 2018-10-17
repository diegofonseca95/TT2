/*
  This component represents the group list at the user
  info section in the dashboard.
*/
Vue.component('dashboard-group-list', {
  props : [
    'user' // The user looking at the dashboard.
  ],
  data : function(){
    return {
      groupsInfo : [] // The groups the user belongs to.
    };
  },
  created : function(){
    // TODO : Fetch the group info.
  },
  template : `
    <ul class="collection scrollable-collection">
      <li class="collection-item grey-color">
        <span>
          El usuario no ha participado en algún grupo
        </span>
      </li>
      <dashboard-group-list-item>
      </dashboard-group-list-item>
    </ul>
  `
});