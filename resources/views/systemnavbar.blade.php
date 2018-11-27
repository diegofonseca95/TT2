<nav>
  <div class="nav-wrapper second-background">
    <a href="#!" class="brand-logo center">
      <i class="material-icons hide-on-small-only">
        <?= $iconoVista ?>
      </i>
      <?= $nombreVista ?>
    </a>
    <ul class="left">
      <li>
        <a href="javascript:history.back()" title="Atras">
          <i class="material-icons left">arrow_back</i>
        </a>
      </li>
      <li>
        <a href="/" title="Men&uacute; Principal">
          <i class="material-icons left">view_module</i>
        </a>
      </li>
    </ul>
    @if(Request::is('publicacionesGrupo/*'))
      <ul class="right">
        <li>
          <a href="/cerrarSesionBlog" title="Cerrar Sesión">
            <i class="material-icons left">power_settings_new</i>
          </a>
        </li>
      </ul>
    @else
    <ul class="right">
      <li>
        <a href="/cerrarSesion" title="Cerrar Sesión">
          <i class="material-icons left">power_settings_new</i>
        </a>
      </li>
    </ul>
    @endif
  </div>
</nav>
