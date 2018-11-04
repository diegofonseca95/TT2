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
      <a class="sidenav-trigger waves-effect" href="#!"
        @click="handleConversationSelected">
        Nikola Tesla
      </a>
      <div class="divider zero-margin"></div>
    </li>
  `
});