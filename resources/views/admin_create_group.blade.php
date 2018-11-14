<!DOCTYPE html>
<html>

<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
    media="screen,projection">
    <link href="{{ asset('css/system_colors.css') }}" rel="stylesheet">
    <link href="{{ asset('css/helpers.css') }}" rel="stylesheet">
  <title>Crear Grupo</title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body class="page-background">

  {{ csrf_field() }}

  <!-- Navbar Begin -->
  @include('systemnavbar');
  <!-- Navbar End -->

  <!-- Content begin -->
  <div class="container" id="admin-create-group-box">
    <div class="section"></div>
    <admin-create-group-view>
    </admin-create-group-view>
  </div>
  <!-- Content End -->


  <!-- Scripts Begin -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
  <script src="https://js.pusher.com/4.3/pusher.min.js"></script>
  <script src="/js/toasts.js"></script>
  <!-- Vue Components Begin -->
  <!-- Common Components Begin -->
  <script src="/js/components/common/user-full-name-span.js"></script>
  <!-- Common Components End -->
  <!-- Chat Begins -->
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
  <script src="/js/components/admin-create-group/new-leader-list-item.js"></script>
  <script src="/js/components/admin-create-group/new-member-list-item.js"></script>
  <!-- List Items End -->
  <!-- Lists Begin -->
  <script src="/js/components/admin-create-group/new-leader-list.js"></script>
  <script src="/js/components/admin-create-group/new-member-list.js"></script>
  <!-- Lists End -->
  <!-- Modals Begin -->
  <script src="/js/components/admin-create-group/new-leader-modal.js"></script>
  <!-- Modals End -->
  <!-- Cards Begin -->
  <script src="/js/components/admin-create-group/add-new-member-card.js"></script>
  <!-- Cards End -->
  <!-- Others Begin -->
  <script src="/js/components/admin-create-group/admin-create-group-view.js"></script>
  <!-- Others End -->
  <!-- Vue Components End -->
  <script src="/js/global/admin/admin-create-group.js"></script>
  <!-- Scripts End -->
</body>

</html>
