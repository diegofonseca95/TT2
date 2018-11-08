<!DOCTYPE html>
<html>
    <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css" media="screen,projection">
        <link rel="stylesheet" type="text/css" href="/css/system_colors.css">
        
        <title>Administrar Grupos</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body class="page-background">
        {{csrf_field()}} 
        <!-- Navbar Begin -->
        <nav>
            <div class="nav-wrapper second-background">
                <a href="#!" class="brand-logo center">
                    <i class="material-icons hide-on-small-only">computer</i>Grupos
                </a>
                <ul class="left">
                    <li>
                        <a href="#!" class="tooltipped" data-position="right" data-tooltip="Volver al Men&uacute;">
                            <i class="material-icons left">view_module</i>
                        </a>
                    </li>
                </ul>
                <ul class="right">
                    <li>
                        <a href="/cerrarSesion" class="tooltipped" data-position="left" data-tooltip="Cerrar Sesi&oacute;n">
                            <i class="material-icons left">power_settings_new</i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
        <!-- Navbar End -->
        <!-- Content Begin -->
        <div class="container">
            <div class="section"></div>
            <div class="row" id="admin-groups-box">
                <!-- Begin Group List -->
                <div class="col s12">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">
                                <b>Grupos</b>
                                <a class="btn-floating btn-large remove-button-background right"
                                  title="Editar" href="/agregarGrupo">
                                  <i class="material-icons">add</i>
                                </a>
                            </span>
                            <admin-group-list 
                                v-bind:component-id="'group-list'"
                                v-bind:groups="groups">
                            </admin-group-list>
                        </div>
                    </div>
                </div>
                <!-- End Group List -->
            </div>
        </div>
        <!-- Content End -->
        <!-- Scripts Begin -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
        <script src="/js/toasts.js"></script>  
        <script src="/js/components/admin-group-list-item.js"></script>
        <script src="/js/components/admin-group-list.js"></script>
        <script src="/js/admin_groups.js"></script>
        <!-- Scripts End -->
    </body>
</html>