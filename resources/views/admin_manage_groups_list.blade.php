<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css" media="screen,projection">
  <link href="{{ asset('css/system_colors.css') }}" rel="stylesheet">
  <link href="{{ asset('css/helpers.css') }}" rel="stylesheet">

  <title>Administrar Grupos</title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body class="page-background">
  {{csrf_field()}}
  <!-- Navbar Begin -->
    @include('systemnavbar')
  <!-- Navbar End -->
  <!-- Content Begin -->
  <div class="container" id="admin-groups-box">
    <div class="section"></div>
    <div class="row">
      <!-- Begin Group List -->
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title">
              <b>Grupos</b>
            </span>
            <div class="row">
              <div class="col s12">
                <button class="btn-floating btn-large remove-button-background right" onclick="window.location.replace('/agregarGrupo');" title="Editar">
                  <i class="material-icons">add</i>
                </button>
              </div>
            </div>
            <admin-group-list v-bind:component-id="'group-list'" v-bind:groups="groups">
            </admin-group-list>
          </div>
        </div>
      </div>
      <!-- End Group List -->
    </div>
    <chat-sidenav-view>
    </chat-sidenav-view>
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
  <script src="/js/components/admin-group-list-item.js"></script>
  <script src="/js/components/admin-group-list.js"></script>
  <script src="/js/admin_groups.js"></script>
  <!-- Scripts End -->
</body>
</html>
