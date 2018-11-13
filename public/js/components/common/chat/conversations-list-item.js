/*
  This component represents an active conversation
  in the sidenav chat.
*/
Vue.component('conversations-list-item', {
  props : [
    'conversation', // The conversation represented by the component.
    'users'         // The user map.
  ],
  methods : {
    handleConversationSelected : function(){
      this.$emit('conversation-selected', this.conversation);
    }
  },
  template : `
    <div class="row zero-horizontal-padding zero-margin">
      <div class="col s12 low-top-padding low-line-height"
        @click="handleConversationSelected">
        <div class="chip black-text"
          v-for="userId in conversation.users"
          :key="userId">
          <user-full-name-span :user="users[userId]">
          </user-full-name-span>
        </div>
      </div>
      <div class="col s12 zero-padding">
        <div class="divider zero-margin"></div>
      </div>
    </div>
  `
});