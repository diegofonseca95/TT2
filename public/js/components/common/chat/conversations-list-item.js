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
    <div class="row zero-horizontal-padding zero-margin">
      <div class="col s12 low-top-padding low-line-height"
        @click="handleConversationSelected">
        <div class="chip black-text">
          {{ JSON.stringify(conversation) }}
        </div>
      </div>
      <div class="col s12 zero-padding">
        <div class="divider zero-margin"></div>
      </div>
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