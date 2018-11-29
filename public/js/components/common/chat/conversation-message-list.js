/*
  This component represents the message list in a conversation
  in the sidenav chat.
*/
Vue.component('conversation-message-list', {
  props : [
    'isSystemConversation',
    'messages',             // The messages in the conversation.
    'users'                 // The user map.
  ],
  template : `
    <div class="row scrollable-chat-messages zero-margin remove-border"
      id="conversation-message-list">
      <conversation-message-list-item
        v-for="message in messages"
        :is-system-conversation="isSystemConversation"
        :user="users[message.idUsuario]"
        :key="message.idMensaje"
        :message="message">
      </conversation-message-list-item>
    </div>
  `
});