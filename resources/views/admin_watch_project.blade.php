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

  <input type="hidden" value="<?= $idGrupo ?>" name="group-id" />

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
  <script src="/js/components/common/user-info-project-list-item.js"></script>
  <script src="/js/components/common/user-info-group-list-item.js"></script>
  <script src="/js/components/common/user-info-task-list-item.js"></script>
  <script src="/js/components/common/user-info-project-list.js"></script>
  <script src="/js/components/common/user-info-group-list.js"></script>
  <script src="/js/components/common/user-info-task-list.js"></script>
  <script src="/js/components/common/user-info-modal.js"></script>
  <!-- Common Components End -->
  <!-- List Items Begin -->
  <script src="/js/components/admin-watch-project/project-member-list-item.js"></script>
  <script src="/js/components/admin-watch-group/new-leader-list-item.js"></script>
  <script src="/js/components/admin-watch-project/new-member-list-item.js"></script>
  <!-- List Items End -->
  <!-- Lists Begin -->
  <script src="/js/components/admin-watch-project/project-member-list.js"></script>
  <script src="/js/components/admin-watch-group/new-leader-list.js"></script>
  <script src="/js/components/admin-watch-project/new-member-list.js"></script>
  <!-- Lists End -->
  <!-- Modals Begin -->
  <script src="/js/components/admin-watch-project/add-new-member-modal.js"></script>
  <!-- Modals End -->
  <!-- Cards Begin -->
  <script src="/js/components/admin-watch-project/new-iteration-card.js"></script>
  <script src="/js/components/admin-watch-project/project-members-card.js"></script>
  <script src="/js/components/admin-watch-project/new-task-card.js"></script>
  <!-- Cards End -->
  <!-- Others Begin -->
  <script src="/js/components/admin-watch-project/admin-watch-project-view.js"></script>
  <!-- Others End -->
  <!-- Vue Components End -->
  <script src="/js/global/admin/admin-watch-project.js"></script>
  <!-- Scripts End -->
</body>

</html>