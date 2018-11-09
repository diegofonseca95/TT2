/*
  This component represents an active conversation
  in the sidenav chat.
*/
Vue.component('conversations-list-item', {
  props : [
    'conversation' // The conversation represented by the component.
  ],
  methods : {
    handleConversationSelected : function(){
      this.$emit('conversation-selected');
    }
  },
  template : `
    <li>
      <a class="waves-effect" href="#!"
        @click="handleConversationSelected">
        {{ JSON.stringify(conversation) }}
      </a>
      <div class="divider zero-margin"></div>
    </li>
  `
});