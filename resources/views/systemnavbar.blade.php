<nav>
  <div class="nav-wrapper first-background">
    <a href="#!" class="brand-logo center truncate" style="max-width:80%;">
      <i class="material-icons hide-on-small-only">
        <?= $iconoVista ?>
      </i>
      <?= $nombreVista ?>
    </a>
    <a href="#" data-target="navbar-sidenav-menu" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    <ul class="left hide-on-med-and-down">
      <li>
        <a href="javascript:history.back()" title="Atras" style="height:100% !important;">
          <i class="material-icons left">arrow_back</i>
        </a>
      </li>
      <li class="valign-wrapper">
        <a href="/" title="Men&uacute; Principal" class="valign-wrapper" style="height:100% !important;">
          <!--<i class="material-icons left">view_module</i> -->
          <img class="responsive-img" src="{{ asset('img/logo-header.png') }}" >
        </a>
      </li>
    </ul>
    @if(Request::is('publicacionesGrupo/*'))
      <ul class="right hide-on-med-and-down">
        <li>
          <a href="/cerrarSesionBlog" title="Cerrar Sesión">
            <i class="material-icons left">power_settings_new</i>
          </a>
        </li>
      </ul>
    @else
    <ul class="right hide-on-med-and-down">
      <li>
        <a href="/cerrarSesion" title="Cerrar Sesión">
          <i class="material-icons left">power_settings_new</i>
        </a>
      </li>
    </ul>
    @endif
    <ul class="sidenav" id="navbar-sidenav-menu">
      <li>
        <a href="javascript:history.back()">
          <i class="material-icons left">arrow_back</i> Atrás
        </a>
      </li>
      <li >
        <a href="/" title="Men&uacute; Principal" >
          <i class="material-icons left">view_module</i>
          Menú Principal
        </a>
      </li>
      @if(Request::is('publicacionesGrupo/*'))
      <li>
        <a href="/cerrarSesionBlog">
          <i class="material-icons left">power_settings_new</i>
          Cerrar Sesión
        </a>
      </li>
      @else
      <li>
        <a href="/cerrarSesion">
          <i class="material-icons left">power_settings_new</i>
          Cerrar Sesión
        </a>
      </li>
      @endif

  </ul>
  </div>
</nav>
<script>
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('#navbar-sidenav-menu');
    var instances = M.Sidenav.init(elems);
  });
</script>
