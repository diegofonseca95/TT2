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
          $canal = "";
          sort($usuarios);
          
          foreach ($usuarios as $value) {
              if($canal != "") $canal = $canal.'.';
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


}
