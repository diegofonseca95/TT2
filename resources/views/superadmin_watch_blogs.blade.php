<!DOCTYPE html>
<html>

<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css" media="screen,projection">
  <link rel="stylesheet" type="text/css" href="{{ asset('css/system_colors.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('css/helpers.css') }}">
  <title>Blogs</title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body class="page-background">

  {{ csrf_field() }}

  <!-- Navbar Begin -->
  @include('systemnavbar')
  <!-- Navbar End -->

  <!-- Content begin -->
  <div class="container" id="superadmin-watch-blogs-box">
    <div class="section"></div>
    <superadmin-watch-blogs-view>
    </superadmin-watch-blogs-view>
  </div>
  <!-- Content End -->

  <!-- Scripts Begin -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
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
  <script src="/js/components/superadmin-watch-blogs/superadmin-watch-blogs-list-item.js"></script>
  <!-- List Items End -->
  <!-- Lists Begin -->
  <!-- Lists End -->
  <!-- Modals Begin -->
  <!-- Modals End -->
  <!-- Cards Begin -->
  <!-- Cards End -->
  <!-- Card Groups Begin -->
  <!-- Card Groups End -->
  <!-- Others Begin -->
  <script src="/js/components/superadmin-watch-blogs/superadmin-watch-blogs-view.js"></script>
  <!-- Others End -->
  <!-- Vue Components End -->
  <script src="/js/global/admin/superadmin-watch-blogs.js"></script>
  <!-- Scripts End -->
  </body>

  </html>