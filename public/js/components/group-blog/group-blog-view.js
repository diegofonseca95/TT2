Vue.component('group-blog-view', {
  data : function(){
    return {
      posts : [ 
        { idPublicacion : 0 }, 
        { idPublicacion : 1 } 
      ]
    };
  },
  methods : {
    handlePostSubmitted : function(){
      // TODO : Handle :P
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
        :key="post.idPublicacion"
        :post="post">
      </group-post>
    </div>
  `
});