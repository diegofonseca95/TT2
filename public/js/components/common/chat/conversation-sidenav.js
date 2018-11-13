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
    'conversation', // The current selected conversation.
    'users'         // The user map.
  ],
  data : function(){
    return {
      messages : [],  // The message list from this conversation.
      socket : null   // The chat connection.
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
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = {
        idConversacion : this.conversation.idConversacion,
        _token : authToken.value,
        mensaje : message
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the message list.
      fetch('/enviarMensaje', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'ERROR'){
          WarningToast(response.result);
        }
      }.bind(this));
    },
    resizeConversation : function(){
      ResizeConversationList();
    }
  },
  watch : {
    conversation : function(){
      console.log("SWITCHED");
      var authToken = document.querySelector('input[name="_token"]');

      // Request data for the 'fetch' function.
      var requestData = {
        headers: { 'Content-Type' : 'application/json' },
        method : 'POST'
      };

      // The body of our request.
      var requestBody = {
        idConversacion : this.conversation.idConversacion,
        _token : authToken.value
      };

      requestData.body = JSON.stringify(requestBody);

      // Fetch the message list.
      fetch('/obtenerConversacion', requestData)
      .then(response => response.json())
      .then(function(response){
        if(response.status === 'OK'){
          var Messages = {};
          for(var i in response.result){
            var message = response.result[i].mensaje;
            message.idUsuario = response.result[i].user;
            Messages.push(message);
          }
          this.messages = Messages;
        }
        // TODO : Handle non 'OK' status.
      }.bind(this));
    }
  },
  template : `
    <ul id="conversation-sidenav" class="sidenav no-overflow">
      <li id="conversation-sidenav-header">
        <a href="#!">
          <i class="material-icons">message</i>
          Conversacion
        </a>
      </li>
      <li id="conversation-sidenav-divider">
        <div class="divider"></div>
      </li>
      <li id="conversation-message-list-container"
        class="zero-margin">
        <conversation-message-list
          :messages="messages"
          :user="users">
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