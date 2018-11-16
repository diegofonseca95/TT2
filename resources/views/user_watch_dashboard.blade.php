<!DOCTYPE html>
<html>

<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
  media="screen,projection">
  <link href="{{ asset('css/system_colors.css') }}" rel="stylesheet">
  <link href="{{ asset('css/helpers.css') }}" rel="stylesheet">
  <title>Mi Dashboard</title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body class="page-background">

  <input type="hidden" value="<?= $idUsuario ?>" name="user-id" />
  <input type="hidden" value="{{ csrf_token() }}" name="token_" id="token_"/>

  {{ csrf_field() }}

  <!-- Navbar Begin -->
  @include('systemnavbar');
  <!-- Navbar End -->

  <input type="text" id="emisor" hidden=true value="1">
  <input type="text" id="receptor" hidden = true value="2">
  <!-- Content begin -->
  <div class="container" id="user-watch-dashboard-box">
    <div class="section"></div>
    <user-watch-dashboard-view>
    </user-watch-dashboard-view>
  </div>


  <!-- Scripts Begin -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="https://js.pusher.com/4.3/pusher.min.js"></script>
  <script src="/js/toasts.js"></script>
  <!-- Vue Components Begin -->
  <!-- Common Components Begin -->
  <script src="/js/components/common/user-full-name-span.js"></script>
  <script src="/js/components/common/priority-span.js"></script>
  <!-- Common Components End -->
  <!-- Chat Begins -->
  <script src="https://js.pusher.com/4.3/pusher.min.js"></script>
  <script src="/js/components/common/chat/conversation-message-list-item.js"></script>
  <script src="/js/components/common/chat/conversation-new-message-box.js"></script>
  <script src="/js/components/common/chat/conversation-message-list.js"></script>
  <script src="/js/components/common/chat/conversation-sidenav.js"></script>
  <script src="/js/components/common/chat/conversations-list-item.js"></script>
  <script src="/js/components/common/chat/conversations-list-sidenav.js"></script>
  <script src="/js/components/common/chat/new-chat-member-list-item.js"></script>
  <script src="/js/components/common/chat/new-chat-member-list.js"></script>
  <script src="/js/components/common/chat/new-chat-modal.js"></script>
  <script src="/js/components/common/chat/chat-sidenav-view.js"></script>
  <!-- Chat Ends -->
  <!-- List Items Begin -->
  <script src="/js/components/user-dashboard/dashboard-project-list-item.js"></script>
  <script src="/js/components/user-dashboard/dashboard-group-list-item.js"></script>
  <script src="/js/components/user-dashboard/dashboard-task-list-item.js"></script>
  <!-- List Items End -->
  <!-- Lists Begin -->
  <script src="/js/components/user-dashboard/dashboard-project-list.js"></script>
  <script src="/js/components/user-dashboard/dashboard-group-list.js"></script>
  <script src="/js/components/user-dashboard/dashboard-task-list.js"></script>
  <!-- Lists End -->
  <!-- Modals Begin -->
  <script src="/js/components/user-dashboard/edit-user-info-modal.js"></script>
  <!-- Modals End -->
  <!-- Cards Begin -->
  <script src="/js/components/user-dashboard/user-personal-info-card.js"></script>
  <script src="/js/components/user-dashboard/user-info-card.js"></script>
  <!-- Cards End -->
  <!-- Card Groups Begin -->
  <!-- Card Groups End -->
  <!-- Others Begin -->
  <script src="/js/components/user-dashboard/user-watch-dashboard-view.js"></script>
  <!-- Others End -->
  <!-- Vue Components End -->
  <script src="/js/global/user/user-dashboard.js"></script>
  <!-- Scripts End -->
</body>

</html>
