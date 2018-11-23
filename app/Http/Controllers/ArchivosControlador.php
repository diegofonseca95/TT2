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

class ArchivosControlador extends Controller
{
    public function subirArchivo(){
        if(!Auth::check()){
            return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
              ]);
        }

        try{


          $size = sizeof($files = Storage::files('archivos/'.request('idProyecto')));
          $size+= 1;
          Storage::disk('local')->put('archivos/'.request('idProyecto').'/'.$size.request('file')->extension(), request('idProyecto'));


          //request('fila')->storeAs('public/blog/'.request('idGrupo'), 'file.'.request('fila')->extension());

          return response()->json([
              'status' => 'OK',
              'result' => 'Archivo subido correctamente',
              'archivo' => 'Archivo '.$size
          ]);
        }

    }
}
