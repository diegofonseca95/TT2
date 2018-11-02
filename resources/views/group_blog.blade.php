<!DOCTYPE html>
<html>

<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
  media="screen,projection">
  <link rel="stylesheet" type="text/css" href="/css/system_colors.css">
  <link rel="stylesheet" type="text/css" href="/css/helpers.css">
  <title>Blog</title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body class="page-background">

  <input type="hidden" value="<?= $idGrupo ?>" name="group-id" />

  {{ csrf_field() }}

  <!-- Navbar Begin -->
  @include('systemnavbar');
  <!-- Navbar End -->

  <!-- Content begin -->
  <div class="container" id="group-blog-box">
    <div class="section"></div>
    <group-blog-view>
    </group-blog-view>
  </div>
  <!-- Content End -->

  <!-- Scripts Begin -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="/js/toasts.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src="https://js.pusher.com/4.3/pusher.min.js"></script>
  <!-- Vue Components Begin -->
  <!-- Common Components Begin -->
  <script src="/js/components/common/user-full-name-span.js"></script>
  <!-- Common Components End -->
  <!-- List Items Begin -->
  <script src="/js/components/group-blog/group-post.js"></script>
  <!-- List Items End -->
  <!-- Lists Begin -->
  <!-- Lists End -->
  <!-- Modals Begin -->
  <!-- Modals End -->
  <!-- Cards Begin -->
  <script src="/js/components/group-blog/blog-info-card.js"></script>
  <!-- Cards End -->
  <!-- Card Groups Begin -->
  <!-- Card Groups End -->
  <!-- Others Begin -->
  <script src="/js/components/group-blog/group-blog-view.js"></script>
  <!-- Others End -->
  <!-- Vue Components End -->
  <script src="/js/global/group/group-blog.js"></script>

  <script>
    //M.AutoInit();

    //Modal initialization - modal_updatePhoto
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.getElementById('modal_updatePhoto');
      var options = {};
      var instances = M.Modal.init(elems, options);
    });

    //Modal initialization - modal_updatePost
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.getElementById('modal_updatePost');
      var options = {};
      var instances = M.Modal.init(elems, options);
    });

    //Initialize dropdowns
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.dropdown-trigger');
      var options = {
        alignment: 'right',
        constrainWidth: false
      }
      var instances = M.Dropdown.init(elems, options);
    });
    </script>
    <!-- Scripts End -->
  </body>

  </html>