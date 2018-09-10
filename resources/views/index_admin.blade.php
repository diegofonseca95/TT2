<!DOCTYPE html>
<html>
    <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css" media="screen,projection">
        <link rel="stylesheet" type="text/css" href="../css/system_colors.css">
        
        <title>Bienvenido</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    </head>
    <body class="page-background">
        <!-- Navbar Begin -->
        <nav>
            <div class="nav-wrapper second-background">
                <a href="#!" class="brand-logo center">
                    <i class="material-icons hide-on-small-only">computer</i>Administrador <?=strtoupper(Session::get('usuario.nombre'))?>
                </a>
            </div>
        </nav>
        <!-- Navbar End -->
        <!-- Content Begin -->
        <div class="container">
            <div class="section"></div>
            <!-- Feature Row Begin -->
            <div class="row">
                <!-- Feature Column Begin -->
                <!-- Exactly Two Colums -->
                <div class="col s12 m6">
                    <!-- Feature Item Begin -->
                    <div class="card medium">
                        <div class="card-image">
                            <!-- Image goes here -->
                            <img src="http://1.bp.blogspot.com/-wtX_9VQuWRM/VnL5QTWcxKI/AAAAAAAAFTc/UZHRDF7hnc8/s320/cardimage.jpg">
                            <span class="card-title third-text">
                                <b>Usuarios</b>
                            </span>
                        </div>
                        <div class="card-content">
                            En &eacute;sta secci&oacute;n puede buscar usuarios, aprobar solicitudes de registro y eliminar usuarios.
                        </div>
                        <div class="card-action">
                            <a class="first-text" href="/administrarUsuarios">
                                Administrar Usuarios
                                <i class="material-icons right">arrow_forward</i>
                            </a>
                        </div>
                    </div>
                    <!-- Feature Item End -->
                    <!-- Feature Item Begin -->
                    <div class="card medium">
                        <div class="card-image">
                            <!-- Image goes here -->
                            <img src="https://mdxminds.files.wordpress.com/2016/09/4578550858_41ed5f4725_b.jpg">
                            <span class="card-title third-text">
                                <b>Proyectos</b>
                            </span>
                        </div>
                        <div class="card-content">
                            Crear grupos, definir el nombre, la descripci&oacute;n, los miembros y el l&iacute;der.
                        </div>
                        <div class="card-action">
                            <a class="first-text" href="#">
                                Crear grupos
                                <i class="material-icons right">arrow_forward</i>
                            </a>
                        </div>
                    </div>
                    <!-- Feature Item End -->
                    <!-- Feature Item Begin -->
                    <div class="card medium">
                        <div class="card-image">
                            <!-- Image goes here -->
                            <img src="https://mdxminds.files.wordpress.com/2016/09/4578550858_41ed5f4725_b.jpg">
                            <span class="card-title third-text">
                                <b>Sitios Web</b>
                            </span>
                        </div>
                        <div class="card-content">
                            Write some description here.
                        </div>
                        <div class="card-action">
                            <a class="first-text" href="#">
                                Go to Stuff
                                <i class="material-icons right">arrow_forward</i>
                            </a>
                        </div>
                    </div>
                    <!-- Feature Item End -->
                </div>
                <!-- Feature Column End -->
                <!-- Feature Column Begin -->
                <!-- Exactly Two Colums -->
                <div class="col s12 m6">
                    <!-- Feature Item Begin -->
                    <div class="card large">
                        <div class="card-image">
                            <!-- Image goes here -->
                            <img src="https://mdxminds.files.wordpress.com/2016/09/4578550858_41ed5f4725_b.jpg">
                            <span class="card-title third-text">
                                <b>Grupos</b>
                            </span>
                        </div>
                        <div class="card-content">
                            Editar grupos, cambiar el nombre, descripci&oacute;n, a&ntilde;adir o eliminar miembros, cambiar de l&iacute;der.
                        </div>
                        <div class="card-action">
                            <a class="first-text" href="/administrarGrupos">
                                Editar Grupos
                                <i class="material-icons right">arrow_forward</i>
                            </a>
                        </div>
                    </div>
                    <!-- Feature Item End -->
                    <!-- Feature Item Begin -->
                    <div class="card medium">
                        <div class="card-image">
                            <!-- Image goes here -->
                            <img src="https://mdxminds.files.wordpress.com/2016/09/4578550858_41ed5f4725_b.jpg">
                            <span class="card-title third-text">
                                <b>Estadisticas</b>
                            </span>
                        </div>
                        <div class="card-content">
                            Write some description here.
                        </div>
                        <div class="card-action">
                            <a class="first-text" href="#">
                                Go to Stuff
                                <i class="material-icons right">arrow_forward</i>
                            </a>
                        </div>
                    </div>
                    <!-- Feature Item End -->
                    <!-- Feature Item Begin -->
                    <div class="card medium">
                        <div class="card-image">
                            <!-- Image goes here -->
                            <img src="https://mdxminds.files.wordpress.com/2016/09/4578550858_41ed5f4725_b.jpg">
                            <span class="card-title third-text">
                                <b>Archivos</b>
                            </span>
                        </div>
                        <div class="card-content">
                            Write some description here.
                        </div>
                        <div class="card-action">
                            <a class="first-text" href="#">
                                Go to Stuff
                                <i class="material-icons right">arrow_forward</i>
                            </a>
                        </div>
                    </div>
                    <!-- Feature Item End -->
                </div>
                <!-- Feature Column End -->
            </div>
            <!-- Feature Row End -->
        </div>
        <!-- Content End -->
        <!-- Scripts Begin -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.min.js"></script>
        <!-- Scripts End -->
    </body>
</html>