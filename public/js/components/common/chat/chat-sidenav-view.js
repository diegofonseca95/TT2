/*
  This component represents the sidenav chat.
*/
Vue.component('chat-sidenav-view', {
  data : function(){
    return {
      selectedConversation : {},
      newMessageBucket : {},
      newMessageCount : 0,
      priorityBucket : {},
      conversations : [],
      validUsers : [],
      channel : null,             // The chat connection.
      pusher : null,              // The pusher object.
      priority : 0,
      userMap : {},
      users : []
    };
  },
  beforeCreate : function(){
    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Fetch the user list.
    fetch('/obtenerTodosUsuarios', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.validUsers = response.validos;
        this.users = response.result;
        var uMap = {};
        for(var i in response.result){
          var user = response.result[i];
          uMap[user.idUsuario] = user;
        }
        this.userMap = uMap;
        // Fetch the conversations list.
        fetch('/obtenerConversaciones', requestData)
        .then(response => response.json())
        .then(function(response){
          if(response.status === 'OK'){
            var chats = [];
            for(var i in response.result){
              var chat = response.result[i].conversacion;
              chat.users = response.result[i].users;
              chats.push(chat);
            }
            chats.map(function(chat){
              this.$set(this.newMessageBucket, chat.idConversacion, 0);
              if(chat.users.length > 1){
                this.$set(this.priorityBucket, chat.idConversacion, 0);
              }else{                
                this.$set(this.priorityBucket,
                  chat.idConversacion, Number.MAX_SAFE_INTEGER);
              }
            }.bind(this));
            this.conversations = chats;
          }
          // TODO : Handle non 'OK' status.
        }.bind(this));
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  mounted : function(){
    M.FloatingActionButton.init(
      document.querySelector(
        '#chat-sidenav-view-trigger'
      )
    );
    // Fetch the user id.
    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    fetch('/obtenerIdUsuario', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        // Subscribe to the new message channel.
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
          'private-nuevo.' + response.result
        );
        this.channel.bind('App\\Events\\NuevoMensaje', function(data) {
          if(data.tipo === 'chat'){
            var newChat = data.conversacion;
            newChat.users = data.integrantes;
            this.createChat(newChat);
            return;
          }
          if(this.selectedConversation.idConversacion !== data.idConversacion){
            var count = this.newMessageBucket[data.idConversacion];
            this.$set(this.priorityBucket, data.idConversacion, ++this.priority);
            this.$set(this.newMessageBucket, data.idConversacion, ++count);
            this.newMessageCount++;
          }
        }.bind(this));
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  methods : {
    handleConversationClosed : function(){
      M.Sidenav.getInstance(
        document.querySelector(
          '#conversations-list-sidenav'
        )
      ).open();
      this.selectedConversation = {};
    },
    handleConversationSelected : function(conversation){
      this.newMessageCount -= this.newMessageBucket[conversation.idConversacion];
      this.newMessageBucket[conversation.idConversacion] = 0;
      this.selectedConversation = conversation;
      M.Sidenav.getInstance(
        document.querySelector(
          '#conversations-list-sidenav'
        )
      ).close();
      M.Sidenav.getInstance(
        document.querySelector(
          '#conversation-sidenav'
        )
      ).open();
    },
    openNewChatModal : function(){
      M.Modal.getInstance(
        document.querySelector(
          '#new-chat-modal'
        )
      ).open();
    },
    createChat : function(newChat){
      if(newChat.users.length > 1){
        this.$set(this.priorityBucket,
          newChat.idConversacion, ++this.priority);
      }else{                
        this.$set(this.priorityBucket,
          newChat.idConversacion, Number.MAX_SAFE_INTEGER);
      }
      this.$set(this.newMessageBucket, newChat.idConversacion, 0);
      this.conversations.push(newChat);
    },
    windowScrollTop : function(){
      window.scrollTo(0, 0);
    }
  },
  computed : {
    validUsersList : function(){
      return this.users.filter(function(user){
        return this.validUsers.includes(user.idUsuario);
      }.bind(this));
    },
    hasNewMessages : function(){
      return this.newMessageCount > 0;
    }
  },
  template : `
    <div>
      <conversations-list-sidenav
        @conversation-selected="handleConversationSelected"
        :new-message-bucket="newMessageBucket"
        :priority-bucket="priorityBucket"
        :conversations="conversations"
        :users="userMap">
      </conversations-list-sidenav>
      <conversation-sidenav
        @conversation-closed="handleConversationClosed"
        :conversation="selectedConversation"
        :users="userMap">
      </conversation-sidenav>
      <new-chat-modal
        :users="validUsersList">
      </new-chat-modal>
      <div class="fixed-action-btn" id="chat-sidenav-view-trigger">
        <a class="sidenav-trigger btn-floating btn-large remove-button-background"
          data-target="conversations-list-sidenav"
          :class="{ pulse : hasNewMessages }">
          <i class="large material-icons">message</i>
        </a>
        <ul>
          <li>
            <a class="btn-floating green"
              title="Ir al Principio"
              @click="windowScrollTop">
              <i class="material-icons">publish</i>
            </a>
          </li>
          <li>
            <a title="Crear Conversación"
              class="btn-floating red"
              @click="openNewChatModal">
              <i class="material-icons">add</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  `
});