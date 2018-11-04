/*
  This component represents the sidenav chat.
*/
Vue.component('chat-sidenav-view', {
  methods : {
    handleConversationClosed : function(){
      M.Sidenav.getInstance(
        document.querySelector(
          '#conversations-list-sidenav'
        )
      ).open();
    },
    handleConversationSelected : function(conversation){
      M.Sidenav.getInstance(
        document.querySelector(
          '#conversations-list-sidenav'
        )
      ).close();
      // TODO : Do something with 'conversation'
      M.Sidenav.getInstance(
        document.querySelector(
          '#conversation-sidenav'
        )
      ).open();
    }
  },
  template : `
    <div>
      <conversations-list-sidenav
        @conversation-selected="handleConversationSelected">
      </conversations-list-sidenav>
      <conversation-sidenav
        @conversation-closed="handleConversationClosed">
      </conversation-sidenav>
      <div class="fixed-action-btn">
        <a class="sidenav-trigger btn-floating btn-large remove-button-background"
          data-target="conversations-list-sidenav">
          <i class="large material-icons">message</i>
        </a>
      </div>
    </div>
  `
});