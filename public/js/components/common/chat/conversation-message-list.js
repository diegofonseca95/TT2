/*
  This component represents the message list in a conversation
  in the sidenav chat.
*/
Vue.component('conversation-message-list', {
  props : [
    'messages' // The messages in the conversation.
  ],
  template : `
    <div class="row scrollable-chat-messages zero-margin remove-border"
      id="conversation-message-list">
      <conversation-message-list-item
        v-for="message in messages"
        :key="message.idMensaje"
        :message="message">
      </conversation-message-list-item>
    </div>
  `
});