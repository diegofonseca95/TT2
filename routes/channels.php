<?php

use App\UsuarioConversacion;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('chat.{id}', function ($user, $id) {
    //return ($user->idUsuario == $id || $id2 == $user->idUsuario);

    if(UsuarioConversacion::where([['idUsuario', $user->idUsuario], ['idConversacion', $id]])->count() == 0){
          return false;
    }
    return true;
});
