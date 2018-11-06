/*
  This component represents the active conversations
  sidenav in the chat.
*/
Vue.component('conversations-list-sidenav', {
  data : function(){
    return {
      conversations : [
        { id : 0 },
        { id : 1 },
        { id : 2 },
        { id : 3 }
      ]
    };
  },
  mounted : function(){
    // Get the sidenav element.
    var sidenav = document.querySelector(
      '#conversations-list-sidenav'
    );
    // Set the options.
    var options = { edge : "right" };
    // Initialize the sidenav.
    M.Sidenav.init(sidenav, options);
  },
  methods : {
    handleConversationSelected : function(){
      this.$emit('conversation-selected');
    }
  },
  template : `
    <ul id="conversations-list-sidenav" class="sidenav">
      <li>
        <a href="#!">
          <i class="material-icons">message</i>Mis Grupos de Chat
        </a>
        <div class="divider"></div>
      </li>
      <conversations-list-item
        v-for="conversation in conversations"
        :key="conversation.id"
        @conversation-selected="handleConversationSelected">
      </conversations-list-item>
    </ul>
  `
});