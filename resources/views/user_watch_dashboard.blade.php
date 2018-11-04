<!DOCTYPE html>
<html>

<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
  media="screen,projection">
  <link rel="stylesheet" type="text/css" href="css/system_colors.css">
  <link rel="stylesheet" type="text/css" href="css/helpers.css">
  <title>Mi Dashboard</title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body class="page-background">

  <input type="hidden" value="<?= $idUsuario ?>" name="user-id" />
  <input type="hidden" value="{{ csrf_token() }}" id="token_" />

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
  <div class="row">

    <!-- Chat Begins -->

    <!-- Chat Right Sidenav Begins -->
    <ul id="slide-out-right" class="sidenav ">
      <!-- Chat Header Begins -->
      <li><a href="#!"><i class="material-icons">message</i>Víctor Noriega</a></li>
      <li><div class="divider"></div></li>
      <!-- Chat Header Ends -->
      <li class="flex-element-expand">
        <ul class="collection scrollable-collection" id="chat-list">

          <!-- Message Begins -->
          <li class="collection-item"><a href="#!" class="low-padding">Luis: Que pasión</a></li>
          <li><div class="divider"></div></li>
          <!-- Message Ends -->
        </ul>
      </li>
      <!-- Chat Footer Begins -->
      <li class="">
        <div class="divider"></div>
        <div class="row zero-margin">
          <div class="col s10 zero-margin zero-padding scrollable-chat">
            <div class="input-field low-padding zero-margin">
              <textarea id="mensaje" class="materialize-textarea zero-margin zero-padding" placeholder="Nuevo Mensaje"></textarea>
            </div>
          </div>
          <div class="col s2">
            <a href="#!">
              <i title="Enviar mensaje" class="material-icons" onclick="enviarMensaje()">send</i>
            </a>
          </div>
        </div>
      </li>
      <!-- Chat Footer Ends -->
    </ul>
    <!-- Chat Right Sidenav Ends -->

    <!-- Chat Left Sidenav Begins -->
    <ul id="slide-out" class="sidenav">
      <li><a href="#!"><i class="material-icons">message</i>Mis grupos de chat</a></li>
      <li><div class="divider"></div></li>
      <!-- Contact Begins -->
      <li><a data-target="slide-out-right" class="sidenav-trigger waves-effect" href="#!" onclick="closeSidenav();">Diego Fonseca</a></li>
      <li><div class="divider"></div></li>
      <!-- Contact Ends -->
      <!-- Contact Begins -->
      <li><a data-target="slide-out-right" class="sidenav-trigger waves-effect" href="#!" onclick="closeSidenav();">Víctor Noriega</a></li>
      <li><div class="divider"></div></li>
      <!-- Contact Ends -->
    </ul>
    <!-- Chat Left Sidenav Ends -->

    <div class="fixed-action-btn">
      <a data-target="slide-out" class="sidenav-trigger btn-floating btn-large remove-button-background">
        <i class="large material-icons">message</i>
      </a>
    </div>
    <!-- Chat Ends -->

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
    <script src="/js/components/common/priority-span.js"></script>
    <!-- Common Components End -->
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

    <script>
    //M.AutoInit();

    //Function for closing chat sidenav
    function closeSidenav(){
      var elem = document.getElementById('slide-out');
      var instance = M.Sidenav.getInstance(elem);
      instance.close();
    }

    //Function that opens the left sidenav
    function openSlideOut(){
      var elem = document.getElementById('slide-out');
      var instance = M.Sidenav.getInstance(elem);
      instance.open();
    }

    //Modal initialization - modal_userSettings
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.getElementById('modal_userSettings');
      var options = {};
      var instances = M.Modal.init(elems, options);
    });

    //Collapsible initialization - collapsible_userQuickAccess
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.getElementById('collapsible_userQuickAccess');
      var options = {};
      var instances = M.Collapsible.init(elems, options);
    });

    //Sidenav initialization - slide-out
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.getElementById('slide-out');
      var options = {};
      var instances = M.Sidenav.init(elems, options);
    });

    //Sidenav initialization - slide-out-right
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.getElementById('slide-out-right');
      var options = {
        edge : "right",
        onCloseStart : openSlideOut
      };
      var instances = M.Sidenav.init(elems, options);
    });

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;
    var pusher = new Pusher('5527fdb0d65f00f390d4', {
      authEndpoint: '/broadcasting/auth',
      cluster:'us2',
      auth: {
        headers: {

          'X-CSRF-TOKEN': $('#token_').val(),

        }
      }
    });

    // Subscribe to the channel we specified in our Laravel Event
    var channel = pusher.subscribe('private-chat.1.2');

    // Bind a function to a Event (the full Laravel class)
    channel.bind('App\\Events\\Chat', function(data) {

      $('#chat-list').append("\
        <li class='collection-item'>\
        <a href=''#!'' class='low-padding'>"
        + data.user.nombre + ": "+ data.message.contenido + "\
        </a>\
        </li>\
        <li>\
        <div class='divider'>\
        </div>\
        </li>");
      $('#mensaje').val("");
    });

    function enviarMensaje(){
      if($('#mensaje').val() == "") return;
      $.post( "/Chat",
      {
        emisor: $('#emisor').val(),
        receptor: $('#receptor').val(),
        mensaje: $('#mensaje').val(),
        _token: $('#token_').val()
      }, function( data ) {

      });
    }
    </script>
    <!-- Scripts End -->
  </body>

  </html>
