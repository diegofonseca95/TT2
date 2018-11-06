// A function to resize the conversation list.
function ResizeConversationList(){
  var headerRect = document.querySelector(
    '#conversation-sidenav-header'
  ).getBoundingClientRect();
  var dividerRect = document.querySelector(
    '#conversation-sidenav-divider'
  ).getBoundingClientRect();
  var footerRect = document.querySelector(
    '#conversation-sidenav-footer'
  ).getBoundingClientRect();
  var container = document.querySelector(
    '#conversation-message-list'
  );
  var conversationHeight = window.innerHeight;
  conversationHeight -= dividerRect.height;
  conversationHeight -= footerRect.height;
  conversationHeight -= headerRect.height;
  container.style.maxHeight = conversationHeight + 'px';
  container.style.height = conversationHeight + 'px';
}

/*
  This component represents the conversation sidenav
  in the chat.
*/
Vue.component('conversation-sidenav', {
  props : [
    'recipientList' // The users with whom the current user chats.
  ],
  data : function(){
    return {
      messages : [
        { idMensaje : 0 },
        { idMensaje : 1 },
        { idMensaje : 2 },
        { idMensaje : 3 },
        { idMensaje : 4 },
        { idMensaje : 5 },
        { idMensaje : 6 }
      ] // The message list from this conversation.
    };
  },
  mounted : function(){
    // Get the sidenav element.
    var sidenav = document.querySelector(
      '#conversation-sidenav'
    );
    // Set the options.
    var options = {
      onCloseStart : function(){
        this.$emit('conversation-closed');
      }.bind(this), 
      edge : "right"
    };
    // Initialize the sidenav.
    M.Sidenav.init(sidenav, options);
    // Resize the conversation list.
    ResizeConversationList();
    // Set the listener to resize whenever window size changes.
    window.addEventListener('resize', function () {
      ResizeConversationList();
    });
  },
  methods : {
    handleMessageSubmitted : function(message){
      console.log(message);
    },
    resizeConversation : function(){
      ResizeConversationList();
    }
  },
  template : `
    <ul id="conversation-sidenav" class="sidenav no-overflow">
      <li id="conversation-sidenav-header">
        <a href="#!">
          <i class="material-icons">message</i>
          Víctor Noriega
        </a>
      </li>
      <li id="conversation-sidenav-divider">
        <div class="divider"></div>
      </li>
      <li id="conversation-message-list-container"
        class="zero-margin">
        <conversation-message-list
          :messages="messages">
        </conversation-message-list>
      </li>
      <li id="conversation-sidenav-footer"
        @keypress="resizeConversation">
        <div class="divider"></div>
        <conversation-new-message-box
          @message-submitted="handleMessageSubmitted">
        </conversation-new-message-box>
      </li>
    </ul>
  `
});