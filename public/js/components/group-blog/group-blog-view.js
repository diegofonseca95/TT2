/*
  This component represents the group blog view.
*/
Vue.component('group-blog-view', {
  data : function(){
    return {
      selectedPost : {},  // The post selected for editing.
      posts : [
        { idPublicacion : 0 }, 
        { idPublicacion : 1 } 
      ] // The group posts.
    };
  },
  methods : {
    handlePostDeleted : function(delPost){
      // Filter the post out of the list.
      this.posts = this.posts.filter(post => {
        return post.idPublicacion !== delPost.idPublicacion;
      });
    },
    handlePostUpdated : function(updPost){
      // Replace the older post with the new one.
      this.posts = this.posts.map(post => {
        if(post.idPublicacion !== updPost.idPublicacion){
          return post;
        }
        return updPost;
      });
    },
    handlePostRejected : function(rejPost){
      // Replace the older post with the new one.
      this.posts = this.posts.map(post => {
        if(post.idPublicacion !== rejPost.idPublicacion){
          return post;
        }
        return rejPost;
      });
    },
    handlePostAccepted : function(acPost){
      // Replace the older post with the new one.
      this.posts = this.posts.map(post => {
        if(post.idPublicacion !== acPost.idPublicacion){
          return post;
        }
        return acPost;
      });
    },
    handlePostSelected : function(post){
      // Set the post for editing.
      this.selectedPost = post;
      // Open the editing modal.
      M.Modal.getInstance(
        document.querySelector('#edit-group-post-modal')
      ).open();
    },
    handlePostSubmitted : function(newPost){
      // Add the new post to the list.
      this.posts.push(newPost);
    }
  },
  template : `
    <div class="row">
      <blog-info-card>
      </blog-info-card>
      <new-post-card
        @post-submitted="handlePostSubmitted">
      </new-post-card>
      <group-post
        v-for="post in posts"
        @post-accepted="handlePostAccepted"
        @post-rejected="handlePostRejected"
        @post-selected="handlePostSelected"
        @post-deleted="handlePostDeleted"
        :key="post.idPublicacion"
        :post="post">
      </group-post>
      <edit-group-post-modal
        @post-updated="handlePostUpdated"
        :post="selectedPost">
      </edit-group-post-modal>
    </div>
  `
});