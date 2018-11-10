<!DOCTYPE html>
<html>

<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
    media="screen,projection">
    <link href="{{ asset('css/system_colors.css') }}" rel="stylesheet">
    <link href="{{ asset('css/helpers.css') }}" rel="stylesheet">
  <title>Ver Iteración</title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body class="page-background">

  <input type="hidden" value="<?= $idSprint ?>" name="iteration-id" />

  {{ csrf_field() }}

  <!-- Navbar Begin -->
  @include('systemnavbar');
  <!-- Navbar End -->

  <!-- Content begin -->
  <div class="container" id="admin-watch-iteration-box">
    <div class="section"></div>
    <user-watch-iteration-view>
    </user-watch-iteration-view>
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
  <script src="/js/components/common/priority-span.js"></script>
  <!-- Common Components End -->
  <!-- List Items Begin -->
  <script src="/js/components/user-watch-iteration/doing-task-list-item.js"></script>
  <script src="/js/components/user-watch-iteration/done-task-list-item.js"></script>
  <script src="/js/components/user-watch-iteration/todo-task-list-item.js"></script>
  <!-- List Items End -->
  <!-- Lists Begin -->
  <script src="/js/components/user-watch-iteration/doing-task-list.js"></script>
  <script src="/js/components/user-watch-iteration/done-task-list.js"></script>
  <script src="/js/components/user-watch-iteration/todo-task-list.js"></script>
  <!-- Lists End -->
  <!-- Modals Begin -->
  <!-- Modals End -->
  <!-- Cards Begin -->
  <script src="/js/components/user-watch-iteration/iteration-info-card.js"></script>
  <!-- Cards End -->
  <!-- Card Groups Begin -->
  <!-- Card Groups End -->
  <!-- Others Begin -->
  <script src="/js/components/user-watch-iteration/task-board.js"></script>
  <script src="/js/components/user-watch-iteration/user-watch-iteration-view.js"></script>
  <!-- Others End -->
  <!-- Vue Components End -->
  <script src="/js/global/user/user-watch-iteration.js"></script>
  <!-- Scripts End -->
</body>

</html>
