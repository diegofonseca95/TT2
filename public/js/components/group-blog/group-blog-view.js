Vue.component('group-blog-view', {
  data : function(){
    return {
      posts : [ { idPublicacion : 0 }, { idPublicacion : 1 } ]
    };
  },
  template : `
    <div class="row">
      <blog-info-card>
      </blog-info-card>
      <group-post
        v-for="post in posts"
        :key="post.idPublicacion"
        :post="post">
      </group-post>
    </div>
  `
});