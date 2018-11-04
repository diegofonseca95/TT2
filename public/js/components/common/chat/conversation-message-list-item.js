/*
  This component represents a message in a conversation
  in the sidenav chat.
*/
Vue.component('conversation-message-list-item', {
  props : [
    'message' // The message displayed.
  ],
  template : `
    <div class="col s12 zero-margin low-vertical-padding low-line-height">
      <div class="chip black-text">
        Nikola Tesla
      </div>
      <br/>
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut nibh ultricies, pellentesque diam
        nec, vehicula ipsum. Integer id vulputate tortor. Nullam eget mi in est pellentesque cursus.
        Curabitur pharetra nisi sit amet fermentum consectetur. Curabitur egestas dapibus velit a
        consequat.
      </span>
    </div>
  `
});