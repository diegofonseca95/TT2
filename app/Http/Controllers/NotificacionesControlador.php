<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Grupo;
use App\AdministradorGrupo;
use App\UsuarioGrupo;
use App\Proyecto;
use App\ProyectoGrupo;
use App\AdministradorProyecto;
use App\UsuarioProyectoGrupo;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Conversacion;
use App\UsuarioConversacion;
use App\Mensaje;
use App\Events\Chat;
use App\Events\NuevoMensaje;
use Illuminate\Support\Facades\Storage;
use League\Flysystem\FileNotFoundException;

class NotificacionesControlador extends Controller
{
    public static function nuevaNotificacion($user, $mensaje){

         $conversacion = Conversacion::where('canal', 'private-chat.'.$user)->first();
         if(Conversacion::where('canal', 'private-chat.'.$user)->count() == 0){
           $nuevo = new Conversacion;
           $nuevo->canal = 'private-chat.'.$user;
           $nuevo->save();
           $usuarioConversacion = new UsuarioConversacion;
           $usuarioConversacion->idUsuario = $user;
           $usuarioConversacion->idConversacion = $nuevo->idConversacion;
           $usuarioConversacion->save();

           event(new NuevoMensaje($nuevo->idConversacion, $user, "chat", $nuevo, array($user)));
           event(new Chat($nuevo->idConversacion, $user, $mensaje));
           event(new NuevoMensaje($nuevo->idConversacion, $user, "mensaje", NULL, NULL));
         }else{
             event(new Chat($conversacion->idConversacion, $user, $mensaje));
             event(new NuevoMensaje($conversacion->idConversacion, $user, "mensaje", NULL, NULL));
         }


    }
}
