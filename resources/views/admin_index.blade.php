<!DOCTYPE html>
<html>

<head>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css"
    media="screen,projection">
    <link href="{{ asset('css/system_colors.css') }}" rel="stylesheet">
    <link href="{{ asset('css/helpers.css') }}" rel="stylesheet">
  <title>Bienvenido</title>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body class="page-background">
  <!-- Navbar Begin -->
  @include('systemnavbar');
  <!-- Navbar End -->

  <!-- Content begin -->
  <div class="" id="user-watch-dashboard-box">
    <div class="section"></div>

    <div class="row valign-wrapper">
      <!-- Admin Option Card Begins -->
      <div class="col s12 m4">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="./img/users.jpg">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">Usuarios<i class="material-icons right">more_vert</i></span>
            <p><a href="/administrarUsuarios">Ir a Usuarios</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Usuarios<i class="material-icons right">close</i></span>
            <p class="justified-text">
              En ésta sección puede buscar usuarios, aprobar solicitudes de registro y eliminar usuarios.
              Así como consultar información relevante de cada usuario registrado en el sistema como lo son grupos a los que pertence, proyectos en los que colabora y tareas realizadas.
            </p>
          </div>
        </div>
      </div>
      <!-- Admin Option Card Ends -->

      <!-- Admin Option Card Begins -->
      <div class="col s12 m4">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="./img/groups.jpg">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">Grupos<i class="material-icons right">more_vert</i></span>
            <p><a href="/administrarGrupos">Ir a Grupos</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Grupos<i class="material-icons right">close</i></span>
            <p class="justified-text">
              Mediante esta opción se podrán consultar los grupos de trabajo registrados en el sistema, así como información relevante de los mismos como lo es los miembros que lo integran, qué proyectos realiza, algunas de sus estadísticas, entre otras.
            </p>
          </div>
        </div>
      </div>
      <!-- Admin Option Card Ends -->

      <!-- Admin Option Card Begins -->
      <div class="col s12 m4">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="./img/projects.jpg">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">Proyectos<i class="material-icons right">more_vert</i></span>
            <p><a href="/administrarProyectos">Ir a Proyectos</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Proyectos<i class="material-icons right">close</i></span>
            <p class="justified-text">
              En esta sección se podrán consultar los proyectos que se han realizado por los grupos de trabajo, quienes son sus participantes, cuál es su estado actual y que tareas se están realizando, el progreso del mismo, entre otra información.
            </p>
          </div>
        </div>
      </div>
      <!-- Admin Option Card Ends -->
    </div>

    <div class="row valign-wrapper">
      <!-- Admin Option Card Begins -->
      <div class="col s12 m4">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="./img/blog.JPG">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">Blogs<i class="material-icons right">more_vert</i></span>
            <p><a href="/administrarBlogs">Ir a Blogs</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Blogs<i class="material-icons right">close</i></span>
            <p class="justified-text">
              Al seleccionar está opción se podrá tener acceso a los blogs asociados con los grupos de trabajo dentro del sistema, mediante los cuales los mismos grupos informan al público en general cuáles han sido sus colaboraciones más importantes así como publicar información relevante para la comunidad interesada.
            </p>
          </div>
        </div>
      </div>
      <!-- Admin Option Card Ends -->

      <!-- Admin Option Card Begins -->
      <div class="col s12 m4">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="./img/statistics.jpg">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">Estadísticas<i class="material-icons right">more_vert</i></span>
            <p><a href="#">Ir a Estadísticas</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Estadísticas<i class="material-icons right">close</i></span>
            <p class="justified-text">
              Consultar estadísticas resultantes del trabajo realizado por los grupos de trabajo y sus proyectos. En esta opción se podrán observar datos relevantes para impulsar la productividad de los grupode trabajo, así como para hacer un análisis de los mismos y realizar informes.
            </p>
          </div>
        </div>
      </div>
      <!-- Admin Option Card Ends -->

      <!-- Admin Option Card Begins -->
      <div class="col s12 m4">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="./img/files.jpg">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">Archivos<i class="material-icons right">more_vert</i></span>
            <p><a href="#">Ir a Archivos</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Archivos<i class="material-icons right">close</i></span>
            <p class="justified-text">
              Aquí se podrán consultar todos los archivos generados por las evidencias subidas por los usuarios al realizar una tarea; ésto de forma organizada mediante una clasificación tanto por grupos de trabajo como de proyectos.
            </p>
          </div>
        </div>
      </div>
      <!-- Admin Option Card Ends -->
    </div>

  </div>
  <!-- Content End -->

  <!-- Scripts Begin -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="./js/toasts.js"></script>
  <script>
    //M.AutoInit();
  </script>
  <!-- Scripts End -->
</body>

</html>
