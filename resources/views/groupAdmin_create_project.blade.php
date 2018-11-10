<!DOCTYPE html>
<html>

<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
    media="screen,projection">
    <link href="{{ asset('css/system_colors.css') }}" rel="stylesheet">
    <link href="{{ asset('css/helpers.css') }}" rel="stylesheet">
  <title>Crear Projecto</title>

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
  <div class="container" id="group-admin-create-project-box">
    <div class="section"></div>
    <group-admin-create-project-view>
    </group-admin-create-project-view>
    </div>
  </div>
  <!-- Content End -->

  <!-- Scripts Begin -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
  <script src="/js/toasts.js"></script>
  <!-- Vue Components Begin -->
  <!-- Common Components Begin -->
  <script src="/js/components/common/user-full-name-span.js"></script>
  <!-- Common Components End -->
  <!-- List Items Begin -->
  <script src="/js/components/group-admin-create-project/new-leader-list-item.js"></script>
  <script src="/js/components/group-admin-create-project/new-member-list-item.js"></script>
  <!-- List Items End -->
  <!-- Lists Begin -->
  <script src="/js/components/group-admin-create-project/new-leader-list.js"></script>
  <script src="/js/components/group-admin-create-project/new-member-list.js"></script>
  <!-- Lists End -->
  <!-- Modals Begin -->
  <script src="/js/components/group-admin-create-project/new-leader-modal.js"></script>
  <!-- Modals End -->
  <!-- Cards Begin -->
  <script src="/js/components/group-admin-create-project/add-new-member-card.js"></script>
  <!-- Cards End -->
  <!-- Others Begin -->
  <script src="/js/components/group-admin-create-project/group-admin-create-project-view.js"></script>
  <!-- Others End -->
  <!-- Vue Components End -->
  <script src="/js/global/group-admin/group-admin-create-project.js"></script>
  <!-- Scripts End -->
</body>

</html>
