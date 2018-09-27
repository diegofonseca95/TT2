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
  <div class="container">
    <div class="section"></div>
    <div class="row" id="admin-watch-group-box">

      <!-- TODO : Calculate the actual set of members -->
      <group-info-card 
        :group-members="memberList">
      </group-info-card>

      <group-members-card 
        @new-members-added="handleNewMembersAdded"
        :group-members="memberList"
        :users="nonMemberList">
      </group-members-card>

      <group-projects-card
        :group-id="groupId">
      </group-projects-card>

      <!-- Group File Tree Begins -->
      <div class="card">
        <div class="card-content">
          <span class="card-title first-text"><b>Árbol de archivos</b></span>
          <div class="row">
            <span class="title truncate col s12">Aquí va el árbol de archivos</span>
          </div>
        </div>
      </div>
      <!-- Group File Tree Ends-->

      <!-- User Modal Definition Begins -->
      <div id="modal_userInfo" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h4>Nombre y Apellidos del usuario</h4>
          <!-- User Groups Begin -->
          <div class="card">
            <div class="card-content">
              <span class="card-title first-text"><b>Grupos en los que ha participado</b></span>
              <user-info-group-list :user-id="0">
              </user-info-group-list>
            </div>
          </div>
          <!-- User Groups End -->

          <!-- User Projects Begin -->
          <div class="card">
            <div class="card-content">
              <span class="card-title first-text"><b>Proyectos en los que ha colaborado</b></span>
              <ul class="collection scrollable-collection">
                <!-- Project Begins-->
                <li class="collection-item avatar"><i class="material-icons circle third-background">folder</i>
                  <div class="row">
                    <span class="title truncate col s12">Nombre del proyecto</span>
                    <span class="title truncate col s12">Líder del proyecto: Nombre Apellidos</span>
                    <div class="right">
                      <a href="#!" title="Ver" class="btn remove-button-background"><i class="material-icons">remove_red_eye</i></a>
                    </div>
                  </div>
                </li>
                <!-- Project Ends -->
                <!-- Project Begins-->
                <li class="collection-item avatar"><i class="material-icons circle third-background">folder</i>
                  <div class="row">
                    <span class="title truncate col s12">Nombre del proyecto</span>
                    <span class="title truncate col s12">Líder del proyecto: Nombre Apellidos</span>
                    <div class="right">
                      <a href="#!" title="Ver" class="btn remove-button-background"><i class="material-icons">remove_red_eye</i></a>
                    </div>
                  </div>
                </li>
                <!-- Project Ends -->
              </ul>
            </div>
          </div>
          <!-- User Projects End -->

          <!-- User Tasks Begin -->
          <div class="card">
            <div class="card-content">
              <span class="card-title first-text"><b>Tareas que ha realizado</b></span>
              <ul class="collection scrollable-collection">
                <!-- Task Begins-->
                <li class="collection-item avatar"><i class="material-icons circle third-background">create</i>
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
                <li class="collection-item avatar"><i class="material-icons circle third-background">create</i>
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
          </div>
          <!-- User Tasks End -->
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Entendido</a>
        </div>
      </div>
      <!-- User Modal Definition Ends-->
    </div>
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
  <!-- Vue Components End -->
  <script src="/js/global/admin/admin-watch-group.js"></script>
  <script>
    M.AutoInit();
  </script>
  <!-- Scripts End -->
</body>

</html>