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
      channel : null, // The chat connection.
      pusher : null,  // The pusher object.
      messages : []   // The message list from this conversation.
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
        if(this.pusher !== null){
          this.pusher.unsubscribe(
            'private-chat.' + this.conversation.idConversacion
          );
          this.pusher = null;
        }
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
    },
    scrollToBottom : function(){
      var List = document.querySelector(
        '#conversation-message-list'
      );
      List.scrollTop = List.scrollHeight;
    }
  },
  watch : {
    conversation : function(){
      if(!this.conversation.hasOwnProperty('idConversacion')){
        return;
      }
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
          var Messages = [];
          for(var i in response.result){
            var message = response.result[i].mensaje;
            message.idUsuario = response.result[i].user;
            Messages.push(message);
          }
          this.messages = Messages;
          this.scrollToBottom();
          // Subscribe to the conversation.
          Pusher.logToConsole = true;
          this.pusher = new Pusher('5527fdb0d65f00f390d4', {
            authEndpoint : '/broadcasting/auth',
            cluster : 'us2',
            auth: {
              headers: {
                'X-CSRF-TOKEN' : authToken.value
              }
            }
          });
          this.channel = this.pusher.subscribe(
            'private-chat.' + this.conversation.idConversacion
          );
          this.channel.bind('App\\Events\\Chat', function(data) {
            var NewMessage = data.message;
            NewMessage.idUsuario = data.user;
            this.messages.push(NewMessage);
            this.scrollToBottom();
          }.bind(this));
        }else{
          WarningToast(response.result);
        }
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
          :users="users">
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
