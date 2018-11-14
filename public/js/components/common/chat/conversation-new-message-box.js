/*
  This component represents the new message conversation
  in the sidenav chat.
*/
Vue.component('conversation-new-message-box', {
  data : function(){
    return {
      newMessage : ''   // The message to be sent.
    };
  },
  methods : {
    handleMessageSubmitted : function(){
      // Check if the message is not empty.
      if(this.newMessage !== ''){
        // Send the new message to the parent.
        this.$emit('message-submitted', this.newMessage);
        this.resetMessageInput();
      }
    },
    resetMessageInput : function(){
      // Reset component values.
      this.newMessage = '';
      // Clear the value of the input.
      var textarea = document.querySelector(
        '#conversation-new-message-box-input'
      );
      textarea.value.replace('');
      // Recompute the size of the text areas.
      M.textareaAutoResize(textarea);
      M.updateTextFields();
    }
  },
  template : `
    <div class="row zero-margin">
      <div class="col s10 zero-margin zero-padding">
        <div class="input-field low-padding zero-margin">
          <textarea class="materialize-textarea zero-margin zero-padding scrollable-chat"
            id="conversation-new-message-box-input" placeholder="Nuevo Mensaje"
            v-model:value="newMessage"></textarea>
        </div>
      </div>
      <div class="col s2">
        <a href="#!">
          <i title="Enviar mensaje" class="material-icons"
            @click="handleMessageSubmitted">send</i>
        </a>
      </div>
    </div>
  `
});