<!DOCTYPE html>
<html>

<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
    media="screen,projection">
  <link rel="stylesheet" type="text/css" href="/css/system_colors.css">
  <link rel="stylesheet" type="text/css" href="/css/helpers.css">
  <title>Ver Proyecto</title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body class="page-background">

  <input type="hidden" value="<?= $idProyecto ?>" name="project-id" />

  {{ csrf_field() }}

  <!-- Navbar Begin -->
  @include('systemnavbar');
  <!-- Navbar End -->

  <!-- Content begin -->
  <div class="container" id="admin-watch-project-box">
    <div class="section"></div>
    <admin-watch-project-view>
    </admin-watch-project-view>
  </div>
  <!-- Content End -->

  <!-- Scripts Begin -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="/js/toasts.js"></script>
  <!-- Vue Components Begin -->
  <!-- Common Components Begin -->
  <script src="/js/components/common/user-full-name-span.js"></script>
  <!-- Common Components End -->
  <!-- List Items Begin -->
  <!-- List Items End -->
  <!-- Lists Begin -->
  <!-- Lists End -->
  <!-- Modals Begin -->
  <!-- Modals End -->
  <!-- Cards Begin -->
  <script src="/js/components/admin-watch-project/new-iteration-card.js"></script>
  <script src="/js/components/admin-watch-project/new-task-card.js"></script>
  <!-- Cards End -->
  <!-- Others Begin -->
  <script src="/js/components/admin-watch-project/admin-watch-project-view.js"></script>
  <!-- Others End -->
  <!-- Vue Components End -->
  <script src="/js/global/admin/admin-watch-project.js"></script>
  <script>
    //M.AutoInit();

    //Modal initialization - modal_projectInfo
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.getElementById('modal_projectInfo');
      var options = {};
      var instances = M.Modal.init(elems, options);
    });

    //Modal initialization - modal_userInfo
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.getElementById('modal_userInfo');
      var options = {};
      var instances = M.Modal.init(elems, options);
    });

    //Modal initialization - modal_addUserToProject
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.getElementById('modal_addUserToProject');
      var options = {};
      var instances = M.Modal.init(elems, options);
    });

    //Modal initialization - modal_assignTask
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.getElementById('modal_assignTask');
      var options = {};
      var instances = M.Modal.init(elems, options);
    });
  </script>
  <!-- Scripts End -->
</body>

</html>