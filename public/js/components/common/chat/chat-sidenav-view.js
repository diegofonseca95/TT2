/*
  This component represents the sidenav chat.
*/
Vue.component('chat-sidenav-view', {
  data : function(){
    return {
      validUsers : [],
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
      console.log(response);
      if(response.status === 'OK'){
        this.validUsers = response.validos;
        this.users = response.result;
        var uMap = {};
        for(var i in response.result){
          console.log(i);
        }
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
  },
  methods : {
    handleConversationClosed : function(){
      M.Sidenav.getInstance(
        document.querySelector(
          '#conversations-list-sidenav'
        )
      ).open();
    },
    handleConversationSelected : function(conversation){
      // TODO : Do something with 'conversation'
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
    }
  },
  computed : {
    validUsersList : function(){
      return this.users.filter(function(user){
        return this.validUsers.includes(user.idUsuario);
      }.bind(this));
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
      <new-chat-modal
        :users="validUsersList">
      </new-chat-modal>
      <div class="fixed-action-btn" id="chat-sidenav-view-trigger">
        <a class="sidenav-trigger btn-floating btn-large remove-button-background"
          data-target="conversations-list-sidenav">
          <i class="large material-icons">message</i>
        </a>
        <ul>
          <li>
            <a class="btn-floating red"
              @click="openNewChatModal">
              <i class="material-icons">add</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  `
});