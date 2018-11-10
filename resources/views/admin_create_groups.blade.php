<!DOCTYPE html>
<html>
    <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css" media="screen,projection">
        <link href="{{ asset('css/system_colors.css') }}" rel="stylesheet">
        <link href="{{ asset('css/helpers.css') }}" rel="stylesheet">
        <link href="https://cdn.datatables.net/1.10.16/css/jquery.dataTables.min.css" rel="stylesheet">
        <title>Crear Grupos</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body class="page-background">
        <nav>
            <div class="nav-wrapper second-background">
                <a href="#!" class="brand-logo center"><i class="material-icons">computer</i>Grupos</a>
                <ul class="right">
                    <li><a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a></li>
                </ul>
            </div>
        </nav>

        <div class="container">

            <div class="section"></div>
            <div class="row">

                <!-- Content Begin -->
                <div class="card">
                    <div class="card-content">
                        <form class="row" action ="/agregarGrupo" method="post">
                            {{csrf_field()}}
                            <span class="card-title first-text">
                                <b>Crear Grupo</b>
                            </span>
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix third-text">people</i>
                                    <input data-error="#group-name-error" placeholder="Grupo" id="groupName" name="nombreGrupo" type="text" class="validate" autofocus>
                                    <label for="groupName">Nombre del Grupo</label>
                                    <div id="group-name-error" class="error-text"></div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <i class="material-icons prefix third-text">description</i>
                                    <textarea name="descripcion" id="descripcion" class="materialize-textarea" placeholder="Descripción"></textarea>
                                    <label for="descripcion">Descripción del Grupo</label>
                                </div>
                            </div>

                            <div class="section">
                                <span class="first-text">
                                    <h6>Seleccionar Integrantes</h6>
                                </span>
                                <table id="tablaUsuarios">
                                    <thead>
                                        <tr>
                                            <th> Nombre </th>
                                            <th> Correo </th>
                                            <th> Telefono </th>
                                            <th> Seleccionar </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($usuarios as $usuario) : ?>
                                            <tr>
                                                <td> <?=$usuario->nombre?> <?=$usuario->apellidoPaterno ?> </td>
                                                <td> <?= $usuario->correo ?></td>
                                                <td> <?= $usuario->telefono ?></td>
                                                <td>
                                                    <label>
                                                        <input type="checkbox" name="integrantes[]" value="<?=$usuario->idUsuario?>"/>
                                                        <span></span>
                                                    </label>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>

                                </table>

                            </div>
                            <div class="row">
                                <div class="col s0 m6"></div>
                                <div class="col s12 m6">
                                    <div class="row">
                                        <button type="button" data-target="leader-modal" onclick="modalLider()" class="waves-effect waves-light btn col s12 second-background modal-trigger" >Elegir L&iacute;der</button>
                                    </div>
                                </div>
                            </div>

                            <!-- Modal Begin -->
                            <div id="leader-modal" class="modal">
                                <div class="modal-content">
                                    <div id = "divLider">
                                    </div>
                                    <div class="row">
                                        <div class="col s0 m6"></div>
                                        <div class="col s12 m6">
                                            <div class="row">
                                                <button type="submit" class="waves-effect waves-light btn col s12 second-background" >Crear Grupo</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Cancelar</a>
                                </div>
                            </div>
                            <!-- Modal End -->
                        </form>
                    </div>
                </div>
                <!-- Content End -->

            </div>
        </div>

        <!-- Sidenav Begin -->
        <ul id="slide-out" class="sidenav">
            <li><a class="subheader">
                <i class="material-icons">people</i>Usuarios
            </a></li>
            <li><a class="waves-effect" href="#!">
                B&uacute;squeda de Usuarios
            </a></li>
            <li><div class="divider"></div></li>
            <li><a class="subheader">
                <i class="material-icons">group_work</i>Grupos
            </a></li>
            <li><a class="waves-effect" href="#!">
                B&uacute;squeda de Grupos
            </a></li>
            <li><div class="divider"></div></li>
            <li><a class="subheader">
                <i class="material-icons">work</i>Proyectos
            </a></li>
            <li><a class="waves-effect" href="#!">
                B&uacute;squeda de Proyectos
            </a></li>
        </ul>
        <!-- Sidenav End -->
        <!-- Floating Button Begin -->
        <div class="fixed-action-btn hide-on-med-and-down">
            <a class="btn-floating btn-large second-background sidenav-trigger" data-target="slide-out">
                <i class="large material-icons">menu</i>
            </a>
        </div>
        <!-- Floating Button End -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.min.js"></script>
        <script src="/js/toasts.js"></script>
        <script src="/js/admin_create_groups.js"></script>
        <script src="//cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
    </body>
</html>
