<!DOCTYPE html>
<html>
    <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css" media="screen,projection">
        <link rel="stylesheet" type="text/css" href="./css/system_colors.css">
        
        <title>Inicia Sesi&oacute;n</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body class="page-background">
        {{csrf_field()}}
        <div class="row" id="login-box">
            <div class="col s1 m2 l3"></div>
            <div class="col s10 m8 l6">
                <div class="card grey lighten-5">
                    <div class="card-content black-text">
                        <div class="section"></div>
                        <div class="row">
                            <div class="col s1"></div>
                            <form class="col s10" id="login-form">
                                {{csrf_field()}}
                                <span class="card-title first-text">
                                    <b>Inicio de Sesi&oacute;n</b>
                                </span>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <i class="material-icons prefix third-text">account_circle</i>
                                        <input data-error="#user-id-error" placeholder="usuario@ejemplo.com" id="userId" name="correo" type="text" class="validate" autofocus>
                                        <label for="userId">Usuario</label>
                                        <div id="user-id-error" class="error-text"></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="input-field col s12">
                                        <i class="material-icons prefix third-text">vpn_key</i>
                                        <input data-error="#password-error" id="password" name="contrasena" type="password" class="validate">
                                        <label for="password">Contrase&ntilde;a</label>
                                        <div id="password-error" class="error-text"></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s0 m6"></div>
                                    <div class="col s12 m6">
                                        <div class="row">
                                            <button type="submit" class="waves-effect waves-light btn col s12 second-background">Enviar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row center-align">
                                    <a class="first-text col s12 m6 modal-trigger" href="#forgot-modal">OLVID&Eacute; MI CONTRASE&Ntilde;A</a>
                                    <div class="section hide-on-med-and-up"></div>
                                    <a class="first-text col s12 m6" href="/agregarUsuario">REG&Iacute;STRATE</a>
                                </div>
                            </form>
                            <div class="col s1"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col s1 m2 l3"></div>
        </div>
        <!-- Modal Structure -->
        <div id="forgot-modal" class="modal">
            <div class="modal-content">
                <div class="row">
                    <div class="col s1"></div>
                    <form class="col s10" id="forgot-form" action="recuperarContrasena">
                        <div class="row">
                            <div class="col s12">
                                <h4>Recuperar Contrase&ntilde;a</h4>
                                <p>Ingresa tu correo para recuperar tu contrase&ntilde;a:</p>
                            </div>
                            <div class="input-field col s12 m9">
                                <i class="material-icons prefix third-text">account_circle</i>
                                <input data-error="#forgot-error" placeholder="usuario@ejemplo.com" name="userId" id="forgotUser" type="text" class="validate" autofocus>
                                <label for="forgotUser">Correo</label>
                                <div id="forgot-error" class="error-text"></div>
                            </div>
                            <div class="col s12 m3">
                                <div class="row">
                                    <button class="waves-effect waves-light btn col s12 red">Enviar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div class="col s1"></div>
                    <div class="col s12 right-align">
                        <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat first-text">Cerrar</a>
                    </div>
                </div>
            </div>
        </div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.min.js"></script>
        <script src="./js/toasts.js"></script>  
        <script src="./js/forgot.js"></script>  
        <script src="./js/index.js"></script>  
        <script src="./js/login.js"></script>  
    </body>
</html>