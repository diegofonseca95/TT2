<!DOCTYPE html>
<html>
    <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css" media="screen,projection">
        <link href="{{ asset('css/system_colors.css') }}" rel="stylesheet">
        <link href="{{ asset('css/helpers.css') }}" rel="stylesheet">

        <title>Administrar Usuarios</title>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body class="page-background">
        {{csrf_field()}}
        <!-- Navbar Begin -->
          @include('systemnavbar');
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
                                @member-selected="handleMemberSelected"
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
                <user-info-modal :user="displayedUser">
                </user-info-modal>
                <chat-sidenav-view>
                </chat-sidenav-view>
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
        <script src="/js/components/admin-user-list-item.js"></script>
        <script src="/js/components/admin-user-list.js"></script>
        <!-- Vue Components Begin -->
        <!-- Common Components Begin -->
        <script src="/js/components/common/user-full-name-span.js"></script>
        <script src="/js/components/common/priority-span.js"></script>
        <script src="/js/components/common/user-info-project-list-item.js"></script>
        <script src="/js/components/common/user-info-group-list-item.js"></script>
        <script src="/js/components/common/user-info-task-list-item.js"></script>
        <script src="/js/components/common/user-info-project-list.js"></script>
        <script src="/js/components/common/new-leader-list-item.js"></script>
        <script src="/js/components/common/user-info-group-list.js"></script>
        <script src="/js/components/common/user-info-task-list.js"></script>
        <script src="/js/components/common/new-leader-list.js"></script>
        <script src="/js/components/common/user-info-modal.js"></script>
        <!-- Common Components End -->
        <!-- Chat Begins -->
        <script src="https://js.pusher.com/4.3/pusher.min.js"></script>
        <script src="/js/components/common/chat/conversation-message-list-item.js"></script>
        <script src="/js/components/common/chat/conversation-new-message-box.js"></script>
        <script src="/js/components/common/chat/conversation-message-list.js"></script>
        <script src="/js/components/common/chat/conversation-sidenav.js"></script>
        <script src="/js/components/common/chat/conversations-list-item.js"></script>
        <script src="/js/components/common/chat/conversations-list-sidenav.js"></script>
        <script src="/js/components/common/chat/new-chat-member-list-item.js"></script>
        <script src="/js/components/common/chat/new-chat-member-list.js"></script>
        <script src="/js/components/common/chat/new-chat-modal.js"></script>
        <script src="/js/components/common/chat/chat-sidenav-view.js"></script>
        <!-- Chat Ends -->
        <script src="/js/admin_users.js"></script>
        <!-- Vue Components End -->
        <!-- Scripts End -->
    </body>
</html>
