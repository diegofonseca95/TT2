/*
  This component represents an active conversation
  in the sidenav chat.
*/
Vue.component('conversations-list-item', {
  props : [
    'newMessageBucket', // The count of new messages for all conversations.
    'conversation',     // The conversation represented by the component.
    'users'             // The user map.
  ],
  methods : {
    handleConversationSelected : function(){
      this.$emit('conversation-selected', this.conversation);
    }
  },
  computed : {
    hasNewMessages : function(){
      return this.newMessageBucket[this.conversation.idConversacion] > 0;
    },
    isSystemConversation : function(){
      if(this.conversation.users)
        return this.conversation.users.length === 1;
      return true;
    }
  },
  watch : {
    newMessageBucket : function(){
      console.log(this.newMessageBucket[this.conversation.idConversacion]);
    }
  },
  template : `
    <div class="row zero-horizontal-padding zero-margin">
      <div class="col s12 low-top-padding low-line-height"
        @click="handleConversationSelected">
        <div class="chip black-text"
          v-for="userId in conversation.users"
          v-if="!isSystemConversation"
          :key="userId">
          <user-full-name-span :user="users[userId]">
          </user-full-name-span>
        </div>
        <div class="chip white-text blue"
          v-if="isSystemConversation">
          Notificaciones
        </div>
        <span class="new badge red" data-badge-caption="nuevos"
          v-if="hasNewMessages">
          {{ newMessageBucket[conversation.idConversacion] }}
        </span>
      </div>
      <div class="col s12 zero-padding">
        <div class="divider zero-margin"></div>
      </div>
    </div>
  `
});