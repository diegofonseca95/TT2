/*
  This component represents the group blog view.
*/
Vue.component('group-blog-view', {
  data : function(){
    return {
      selectedPost : {},  // The post selected for editing.
      permissions : {},   // The view permissions.
      posts : []          // The group posts.
    };
  },
  beforeCreate : function(){
    // Get the group id from the hidden input.
    var groupIdInput = document.querySelector('input[name="group-id"]');

    var authToken = document.querySelector('input[name="_token"]');

    // Request data for the 'fetch' function.
    var requestData = {
      headers: { 'Content-Type' : 'application/json' },
      method : 'POST'
    };

    // The body of our request.
    var requestBody = { 
      idGrupo : groupIdInput.value,
      _token : authToken.value
    };

    requestData.body = JSON.stringify(requestBody);

    // Send the new post to the server.
    fetch('/obtenerPublicaciones', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        var postsList = [];
        for(var i in response.result){
          var post = response.result[i];
          post.permissions = response.permisos[post.idPublicacion];
          post.author = response.usuarios[post.idUsuario];
          postsList.push(post);
        }
        this.posts = postsList;
      }else{
        WarningToast(response.result);
      }
    }.bind(this));

    // Fetch the group permissions.
    fetch('/permisosBlog', requestData)
    .then(response => response.json())
    .then(function(response){
      if(response.status === 'OK'){
        this.permissions = response.result;
      }
      // TODO : Handle non 'OK' status.
    }.bind(this));
  },
  computed : {
    orderedList : function(){
      return this.posts.reverse();
    }
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
      <blog-info-card 
        :permissions="permissions">
      </blog-info-card>
      <new-post-card
        @post-submitted="handlePostSubmitted"
        v-if="permissions.crear">
      </new-post-card>
      <group-post
        v-for="post in orderedList"
        @post-accepted="handlePostAccepted"
        @post-rejected="handlePostRejected"
        @post-selected="handlePostSelected"
        @post-deleted="handlePostDeleted"
        :key="post.idPublicacion"
        :post="post">
      </group-post>
      <edit-group-post-card
        @post-updated="handlePostUpdated"
        :post="selectedPost">
      </edit-group-post-card>
      <chat-sidenav-view
        v-if="permissions.chat">
      </chat-sidenav-view>
    </div>
  `
});
/*

      <edit-group-post-modal
        @post-updated="handlePostUpdated"
        :post="selectedPost">
      </edit-group-post-modal>
*/