/*
  This component represents the active conversations
  sidenav in the chat.
*/
Vue.component('conversations-list-sidenav', {
  props : ['conversations'],
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
        @conversation-selected="handleConversationSelected"
        :key="conversation.idConversacion"
        :conversation="conversation">
      </conversations-list-item>
    </ul>
  `
});