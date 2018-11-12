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
    <div class="col s12 zero-margin low-vertical-padding low-line-height">
      <div class="chip black-text">
        {{ JSON.stringify(conversation) }}
      </div>
      <div class="divider zero-margin"></div>
    </div>
  `
});
/*
    <li>
      <a class="waves-effect" href="#!"
        @click="handleConversationSelected">
        {{ JSON.stringify(conversation) }}
      </a>
      <div class="divider zero-margin"></div>
    </li>
*/