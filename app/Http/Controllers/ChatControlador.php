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
use Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Conversacion;
use App\UsuarioConversacion;
use App\Mensaje;
use App\Events\Chat;

class ChatControlador extends Controller
{
    public function nuevaConversacion(){
          if(!Auth::check()){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Inicia sesion para continuar'
                ]);
          }
          $usuarios = request('usuarios');
          $canal = "private-chat";
          sort($usuarios);

          foreach ($usuarios as $value) {
              $canal = $canal.'.';
              $canal = $canal.$value;
          }

          $conversacion = Conversacion::where('canal', $canal)->get();

          if(sizeof($conversacion) != 0){
              return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Ya existe una conversacion con esos integrantes'
                ]);
          }

          $conversacion = new Conversacion;
          $conversacion->canal = $canal;
          $conversacion->save();


          foreach ($usuarios as $value) {
              $usuarioConversacion = new UsuarioConversacion;
              $usuarioConversacion->idUsuario = $value;
              $usuarioConversacion->idConversacion = $conversacion->idConversacion;
              $usuarioConversacion->save();

          }

          return response()->json([
                  'status' => 'OK',
                  'result' => $conversacion,
                  'users' => $usuarios
            ]);

    }
    public function enviarMensaje(){
        if(!Auth::check()){
            return response()->json([
                  'status' => 'ERROR',
                  'result' => 'Inicia sesion para continuar'
            ]);
        }
        event(new Chat(request('idConversacion'), Auth::id(), request('mensaje')));

        return response()->json([
              'status' => 'OK'
        ]);

    }
    public function obtenerConversaciones(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }

        $conversaciones = UsuarioConversacion::where('idUsuario', Auth::id())->get();
        $result = array();
        foreach ($conversaciones as $value) {
            $conversacion = Conversacion::where('idConversacion', $value->idConversacion)->first();
            $usuarios = UsuarioConversacion::where('idConversacion', $value->idConversacion)->get();
            $idUsuarios = array();
            foreach ($usuarios as $value) {
               array_push($idUsuarios, $value->idUsuario );
            }
            array_push($result, array(
                'conversacion' => $conversacion,
                'users' => $idUsuarios
            ));
        }

        return response()->json([
            'status' => 'OK',
            'result' => $result
        ]);
    }

    public function obtenerConversacion(){
      if(!Auth::check()){
          return response()->json([
              'status' => 'ERROR',
              'result' => 'Inicia sesion para continuar'
          ]);
      }

      $conversacion = UsuarioConversacion::where('idConversacion', request('idConversacion'))->get();
      $ids = array();
      $mapa = array();
      foreach ($conversacion as $value) {
         $mapa[$value->idUsuarioConversacion] = $value->idUsuario;
         array_push($ids, $value->idUsuarioConversacion);
      }
      $mensajes = Mensaje::whereIn('idUsuarioConversacion', $ids)->get();
      $result = array();

      foreach ($mensajes as  $value) {
          array_push($result, array(
                'mensaje' => $value,
                'user' => $mapa[$value->idUsuarioConversacion]
          ));

      }
      return response()->json([
          'status' => 'OK',
          'result' => $result
      ]);
    }

}
