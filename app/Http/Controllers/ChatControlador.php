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
use App\Events\NuevoMensaje;
use Illuminate\Support\Facades\Crypt;

class ChatControlador extends Controller
{
    public function nuevaConversacion(){
          if(!Auth::check()){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Inicia sesion para continuar'
                ]);
          }
          $id = Auth::id();
          $flag = false;
          $usuarios = request('usuarios');
          $canal = "private-chat";

          foreach ($usuarios as $value) {
              if($value == $id){
                  $flag = true;
                  break;
              }
          }
          if(!$flag ) array_push($usuarios, $id);

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
              event(new NuevoMensaje($conversacion->idConversacion, $value, "chat", $conversacion, $usuarios));
          }

          return response()->json([
                  'status' => 'OK',
                  'result' => 'Se ha creado la conversacion'
            ]);

    }
    public function enviarMensaje(){
        if(!Auth::check()){
            return response()->json([
                  'status' => 'ERROR',
                  'result' => 'Inicia sesion para continuar'
            ]);
        }
        event(new Chat(request('idConversacion'), Auth::id(), Crypt::encrypt(request('mensaje'))));

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
          $message = (object) [
          'idMensaje' => $value->idMensaje,
          'contenido' => Crypt::decrypt($value->contenido),
          'idUsuarioConversacion' => $value->idUsuarioConversacion,
          'fecha' => $value->fecha,
          ];
          array_push($result, array(
                'mensaje' => $message,
                'user' => $mapa[$value->idUsuarioConversacion]
          ));

      }
      return response()->json([
          'status' => 'OK',
          'result' => $result
      ]);
    }

}
