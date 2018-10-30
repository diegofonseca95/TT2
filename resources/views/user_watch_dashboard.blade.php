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

      <!-- User Card Begins -->
      <div class="card">
        <div class="card-content">
          <ul class="collection remove-border">
            <li class="collection-item avatar"><i class="material-icons circle third-background">person</i>
              <div class="row">
                <span class="card-title first-text col s12 m11"><b>Nombre del Usuario</b></span>
                <span class="col s12 m11">Correo : algorithm@mail.com</span>
                <span class="col s12 m11">Teléfono : 5555555555</span>
                <div class="col s12 m1">
                  <button title="Ajustes" data-target="modal_userSettings" class="btn-floating btn-large modal-trigger remove-button-background right">
                    <i class="material-icons">settings</i>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- User Card Ends -->

      <!-- Quick Access Collapsible for User Begins -->
      <ul class="collapsible" id="collapsible_userQuickAccess">
        <!-- User Groups Begin -->
        <li>
          <div class="collapsible-header"><i class="material-icons">group</i>Grupos en los que he participado</div>
          <div class="collapsible-body zero-padding">
            <ul class="collection scrollable-collection">
              <!-- No group item Begins-->
              <li class="collection-item grey-color">
                <span>El usuario no ha participado en algún grupo</span>
              </li>
              <!-- No group item Ends-->
              <!-- Group Begins-->
              <li class="collection-item grey-color">
                <div class="row">
                  <div class="col s12 m10">
                    <span class="title truncate col s12">Nombre del grupo</span>
                    <span class="title truncate col s12">Líder del grupo: Nombre apellido</span>
                  </div>
                  <div class="right">
                    <a href="#!" title="Ver" class="btn remove-button-background"><i class="material-icons">remove_red_eye</i></a>
                  </div>
                </div>
              </li>
              <!-- Group Ends -->
              <!-- Group Begins-->
              <li class="collection-item grey-color">
                <div class="row">
                  <div class="col s12 m10">
                    <span class="title truncate col s12">Nombre del grupo</span>
                    <span class="title truncate col s12">Líder del grupo: Nombre apellido</span>
                  </div>
                  <div class="right">
                    <a href="#!" title="Ver" class="btn remove-button-background"><i class="material-icons">remove_red_eye</i></a>
                  </div>
                </div>
              </li>
              <!-- Group Ends -->
              <!-- Group Begins-->
              <li class="collection-item grey-color">
                <div class="row">
                  <div class="col s12 m10">
                    <span class="title truncate col s12">Nombre del grupo</span>
                    <span class="title truncate col s12">Líder del grupo: Nombre apellido</span>
                  </div>
                  <div class="right">
                    <a href="#!" title="Ver" class="btn remove-button-background"><i class="material-icons">remove_red_eye</i></a>
                  </div>
                </div>
              </li>
              <!-- Group Ends -->
              <!-- Group Begins-->
              <li class="collection-item grey-color">
                <div class="row">
                  <div class="col s12 m10">
                    <span class="title truncate col s12">Nombre del grupo</span>
                    <span class="title truncate col s12">Líder del grupo: Nombre apellido</span>
                  </div>
                  <div class="right">
                    <a href="#!" title="Ver" class="btn remove-button-background"><i class="material-icons">remove_red_eye</i></a>
                  </div>
                </div>
              </li>
              <!-- Group Ends -->
            </ul>
          </div>
        </li>
        <!-- User Groups End -->
        <!-- User Projects Begin -->
        <li>
          <div class="collapsible-header"><i class="material-icons">folder</i>Proyectos en los que he colaborado</div>
          <div class="collapsible-body zero-padding">
            <ul class="collection scrollable-collection">
              <!-- No project item Begins-->
              <li class="collection-item grey-color">
                <span>El usuario no ha colaborado en algún proyecto</span>
              </li>
              <!-- No project item Ends -->
              <!-- Project Begins-->
              <li class="collection-item grey-color">
                <div class="row">
                  <div class="col s12 m10">
                    <span class="title truncate col s12">Nombre del proyecto</span>
                    <span class="title truncate col s12">Líder del proyecto: Nombre Apellidos</span>
                  </div>
                  <div class="right">
                    <a href="#!" title="Ver" class="btn remove-button-background"><i class="material-icons">remove_red_eye</i></a>
                  </div>
                </div>
              </li>
              <!-- Project Ends -->
              <!-- Project Begins-->
              <li class="collection-item grey-color">
                <div class="row">
                  <div class="col s12 m10">
                    <span class="title truncate col s12">Nombre del proyecto</span>
                    <span class="title truncate col s12">Líder del proyecto: Nombre Apellidos</span>
                  </div>
                  <div class="right">
                    <a href="#!" title="Ver" class="btn remove-button-background"><i class="material-icons">remove_red_eye</i></a>
                  </div>
                </div>
              </li>
              <!-- Project Ends -->
              <!-- Project Begins-->
              <li class="collection-item grey-color">
                <div class="row">
                  <div class="col s12 m10">
                    <span class="title truncate col s12">Nombre del proyecto</span>
                    <span class="title truncate col s12">Líder del proyecto: Nombre Apellidos</span>
                  </div>
                  <div class="right">
                    <a href="#!" title="Ver" class="btn remove-button-background"><i class="material-icons">remove_red_eye</i></a>
                  </div>
                </div>
              </li>
              <!-- Project Ends -->
            </ul>
          </div>
        </li>
        <!-- User Projects End -->
        <!-- User Tasks Begin -->
        <li>
          <div class="collapsible-header"><i class="material-icons">edit</i>Tareas que he realizado</div>
          <div class="collapsible-body zero-padding">
            <ul class="collection scrollable-collection">
              <!-- No task item Begins-->
              <li class="collection-item grey-color">
                <span>El usuario no ha realizado alguna tarea</span>
              </li>
              <!-- No task item Ends -->
              <!-- Task Begins-->
              <li class="collection-item grey-color">
                <div class="row">
                  <span class="title truncate col s12">Nombre de la tarea realizada</span>
                  <span class="title truncate col s12"> </span>
                  <span class="title truncate col s12">Para el grupo: Nombre del grupo</span>
                  <span class="title truncate col s12">Para el proyecto: Nombre del proyecto</span>
                  <span class="title truncate col s12">Descripción de la tarea realizada</span>
                  <span class="title truncate col s12"><a href="#!">Descargar evidencia</a></span>
                </div>
              </li>
              <!-- Task Ends -->
              <!-- Task Begins-->
              <li class="collection-item grey-color">
                <div class="row">
                  <span class="title truncate col s12">Nombre de la tarea realizada</span>
                  <span class="title truncate col s12"> </span>
                  <span class="title truncate col s12">Para el grupo: Nombre del grupo</span>
                  <span class="title truncate col s12">Para el proyecto: Nombre del proyecto</span>
                  <span class="title truncate col s12">Descripción de la tarea realizada</span>
                  <span class="title truncate col s12"><a href="#!">Descargar evidencia</a></span>
                </div>
              </li>
              <!-- Task Ends -->
            </ul>
          </div>
        </li>
        <!-- User Tasks End -->
      </ul>
      <!-- Quick Access for User Ends -->

      <!-- User Settings Modal Definition Begins -->
      <div id="modal_userSettings" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4>Ajustes de Usuario</h4>
          <form class="col s12">
            <div class="row">
              <!-- User Basic Info Begins-->
              <div class="input-field col s12 m4">
                <input placeholder="Nombres" value="Nombre1 Nombre2" id="user_firstName" type="text" class="validate">
                <label for="user_firstName">Nombres</label>
              </div>
              <div class="input-field col s12 m4">
                <input placeholder="Apellido paterno" value="Apellido paterno" id="user_firstLastName" type="text"
                class="validate">
                <label for="user_firstLastName">Apellido paterno</label>
              </div>
              <div class="input-field col s12 m4">
                <input placeholder="Apellido materno" value="Apellido materno" id="user_secondLastName" type="text"
                class="validate">
                <label for="user_secondLastName">Apellido materno</label>
              </div>
              <div class="input-field col s12">
                <input placeholder="Correo electrónico" value="correoUsuario@gmail.com" id="user_email" type="text"
                class="validate">
                <label for="user_email">Correo electrónico</label>
              </div>
              <div class="input-field col s12">
                <input placeholder="Número telefónico" value="+51 1 55 1234 5678" id="user_phoneNumber" type="text"
                class="validate">
                <label for="user_phoneNumber">Número telefónico</label>
              </div>
              <!-- User Basic Info Ends -->
              <!-- User Password Info Begins -->
              <div class="input-field col s12 m4">
                <input placeholder="Contraseña actual" value="" id="user_password" type="password" class="validate">
                <label for="user_password">Constraseña actual</label>
              </div>
              <div class="input-field col s12 m4">
                <input placeholder="Nueva contraseña" value="" id="user_newPassword" type="password" class="validate">
                <label for="user_newPassword">Nueva contraseña</label>
              </div>
              <div class="input-field col s12 m4">
                <input placeholder="Repetir nueva contraseña" value="" id="user_newPasswordConfirmation" type="password"
                class="validate">
                <label for="user_newPasswordConfirmation">Repetir nueva contraseña</label>
              </div>
              <!-- User Password Info Ends -->
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cancelar</a>
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Aplicar cambios</a>
        </div>
      </div>
      <!-- User Settings Modal Definition Ends -->

    </div>
  </div>
  <!-- Content End -->

  <!-- Scripts Begin -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="js/toasts.js"></script>
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
  <!-- Modals End -->
  <!-- Cards Begin -->
  <script src="/js/components/user-dashboard/user-info-card.js"></script>
  <!-- Cards End -->
  <!-- Card Groups Begin -->
  <!-- Card Groups End -->
  <!-- Others Begin -->
  <script src="/js/components/user-dashboard/task-board.js"></script>
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

          'X-CSRF-TOKEN': $('#_token').val(),

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
          _token: $('#_token').val()
        }, function( data ) {

        });
    }
  </script>
    <!-- Scripts End -->
  </body>

  </html>
