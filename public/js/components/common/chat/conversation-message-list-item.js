/*
  This component represents a message in a conversation
  in the sidenav chat.
*/
Vue.component('conversation-message-list-item', {
  props : [
    'message',  // The message displayed.
    'user'      // The user who wrote the message.
  ],
  template : `
    <div class="col s12 zero-margin low-vertical-padding low-line-height">
      <div class="chip black-text">
        <user-full-name-span :user="user">
        </user-full-name-span>
      </div>
      <br/>
      <span>
        {{ message.contenido }}
      </span>
      <span class="badge">
        {{ message.fecha }}
      </span>
    </div>
  `
});