<!DOCTYPE html>
<html>

<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
    media="screen,projection">
  <link rel="stylesheet" type="text/css" href="/css/system_colors.css">
  <link rel="stylesheet" type="text/css" href="/css/helpers.css">
  <title>Ver Grupo</title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body class="page-background">

  <input type="hidden" value="<?= $idGrupo ?>" name="group-id" />

  {{ csrf_field() }}

  <!-- Navbar Begin -->
  <nav>
    <div class="nav-wrapper second-background">
      <ul class="left">
        <li>
          <a href="#!" class="tooltipped" data-position="right" data-tooltip="Volver al Men&uacute;">
            <i class="material-icons left">view_module</i>
          </a>
        </li>
      </ul>
      <a href="#!" class="brand-logo center">
        <i class="material-icons">computer</i>
        <span class="hide-on-small-only">Ver Grupo</span>
      </a>
      <ul class="right">
        <li><a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a></li>
      </ul>
    </div>
  </nav>
  <!-- Navbar End -->

  <!-- Content begin -->
  <div class="container" id="admin-watch-group-box">
    <div class="section"></div>
    <admin-watch-group-view>
    </admin-watch-group-view>
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
  <script src="/js/components/admin-watch-group/new-leader-list-item.js"></script>
  <script src="/js/components/admin-watch-group/new-leader-list.js"></script>
  <script src="/js/components/admin-watch-group/edit-group-info-modal.js"></script>
  <script src="/js/components/admin-watch-group/group-info-card.js"></script>
  <script src="/js/components/admin-watch-group/group-member-list-item.js"></script>
  <script src="/js/components/admin-watch-group/group-member-list.js"></script>
  <script src="/js/components/admin-watch-group/new-member-list-item.js"></script>
  <script src="/js/components/admin-watch-group/new-member-list.js"></script>
  <script src="/js/components/admin-watch-group/add-new-member-modal.js"></script>
  <script src="/js/components/admin-watch-group/user-info-group-list-item.js"></script>
  <script src="/js/components/admin-watch-group/user-info-group-list.js"></script>
  <script src="/js/components/admin-watch-group/user-info-modal.js"></script>
  <script src="/js/components/admin-watch-group/group-members-card.js"></script>
  <script src="/js/components/admin-watch-group/project-list-item.js"></script>
  <script src="/js/components/admin-watch-group/project-list.js"></script>
  <script src="/js/components/admin-watch-group/group-projects-card.js"></script>
  <script src="/js/components/admin-watch-group/admin-watch-group-view.js"></script>
  <!-- Vue Components End -->
  <script src="/js/global/admin/admin-watch-group.js"></script>
  <script>
    M.AutoInit();
  </script>
  <!-- Scripts End -->
</body>

</html>