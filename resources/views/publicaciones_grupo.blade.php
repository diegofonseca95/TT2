<!DOCTYPE html>
<html>
    <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css" media="screen,projection">
        <link href="{{ asset('css/system_colors.css') }}" rel="stylesheet">
        <link href="{{ asset('css/helpers.css') }}" rel="stylesheet">

        <title>Blog</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body class="page-background">
        {{csrf_field()}}
        <!-- Navbar Begin -->
        <nav>
            <div class="nav-wrapper second-background">
                <a href="#!" class="brand-logo center">
                    <i class="material-icons hide-on-small-only">library_books</i>Blog
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
        <div class="container" id="posts-box">
            <div class="section"></div>
            <div class="row">
                <!-- Begin Post List -->
                <div class="col s12">
                    <!-- Post Begin -->
                    <post-list-item
                        v-for="post in posts"
                        v-bind:edit-function="enableEdit"
                        v-bind:key="post.id"
                        v-bind:post="post">
                    </post-list-item>
                    <!-- Post End -->
                </div>
                <!-- End Post List -->
            </div>
            <!-- Floating Button Begin -->
            <div class="fixed-action-btn hide-on-med-and-down">
                <a class="btn-floating btn-large second-background modal-trigger" href="#post-modal" v-on:click="disableEdit">
                    <i class="large material-icons tooltipped" data-position="left" data-tooltip="Crear Publicaci&oacute;n">add</i>
                </a>
            </div>
            <!-- Floating Button End -->
            <!-- Modal Begin -->
<div id="post-modal" class="modal">
<div class="modal-content">
<h4 v-if="!editMode">Crear Publicaci&oacute;n</h4>
<h4 v-if="editMode">Editar Publicaci&oacute;n</h4>
    <form class="col s12" id="post-form">
        <div class="row">
            <div class="input-field col s12">
                <i class="material-icons prefix third-text">account_circle</i>
                <input data-error="#post-title-error" placeholder="T&iacute;tulo" id="postTitle" name="titulo" type="text" class="validate" v-bind:value="editItem.titulo" autofocus>
                <label for="postTitle">T&iacute;tulo de la Publicaci&oacute;n</label>
                <div id="post-title-error" class="error-text"></div>
            </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
                <i class="material-icons prefix third-text">vpn_key</i>
                <textarea name="contenido" id="postContent" class="materialize-textarea validate" placeholder="Contenido de la Publicaci&oacute;n" data-error="#content-error"  data-length="500" v-bind:value="editItem.contenido"></textarea>
                <label for="content">Contenido</label>
                <div id="content-error" class="error-text"></div>
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
    </form>
</div>
<div class="modal-footer">
<a href="#!" class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
</div>
</div>
            <!-- Modal End -->
        </div>
        <!-- Content End -->
        <!-- Scripts Begin -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/jquery.validate.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.17.0/dist/additional-methods.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
        <script src="/js/validate/custom-methods.js"></script>
        <script src="../js/toasts.js"></script>
        <script src="../js/components/post-list-item.js"></script>
        <script src="../js/publicaciones_grupo.js"></script>
        <!-- Scripts End -->
    </body>
</html>
