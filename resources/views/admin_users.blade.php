<!DOCTYPE html>
<html>
    <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css" media="screen,projection">
        <link rel="stylesheet" type="text/css" href="../css/system_colors.css">
        
        <title>Administrar Usuarios</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body class="page-background">
        {{csrf_field()}} 
        <!-- Navbar Begin -->
        <nav>
            <div class="nav-wrapper second-background">
                <a href="#!" class="brand-logo center">
                    <i class="material-icons hide-on-small-only">computer</i>Usuarios
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
            <div class="row" id="admin-users-box">
                <!-- Begin Approved User List -->
                <div class="col s12 l6">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">
                                <b>Usuarios Aprobados</b>
                            </span>
                            <admin-user-list 
                                v-bind:component-id="'approved-list'"
                                v-bind:filter="true" 
                                v-bind:users="users">
                            </admin-user-list>
                        </div>
                    </div>
                </div>
                <!-- End Approved User List -->
                <!-- Begin Pending User List -->
                <div class="col s12 l6">
                    <div class="card">
                        <div class="card-content">
                            <span class="card-title">
                                <b>Usuarios Pendientes</b>
                            </span>
                            <admin-user-list 
                                v-bind:component-id="'pending-list'"
                                v-bind:filter="false" 
                                v-bind:users="users">
                            </admin-user-list>
                        </div>
                    </div>
                </div>
                <!-- End Pending User List -->
            </div>
        </div>
        <!-- Content End -->
        <!-- Scripts Begin -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
        <script src="../js/toasts.js"></script>  
        <script src="../js/components/admin-user-list-item.js"></script>
        <script src="../js/components/admin-user-list.js"></script>
        <script src="../js/admin_users.js"></script>
        <!-- Scripts End -->
    </body>
</html>