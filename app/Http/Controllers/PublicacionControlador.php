<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Publicaciones;
use App\Grupo;
use Auth;
use App\AdministradorGrupo;
use App\Usuario;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class PublicacionControlador extends Controller
{
    //
    /*public function publicacionesGrupo($idGrupo){
   		$publicacion = new Publicacion;
   		$query = $publicacion->where('idGrupo', '=', $idGrupo)->get();
   		return view('publicaciones_grupo',['publicaciones' => $query]);
    }*/
    public function publicacionesGrupo($idGrupo){

      $grupo = Grupo::where('idGrupo', $idGrupo)->first();
   		return view('group_blog', ['idGrupo'=> $idGrupo, 'nombreVista' => $grupo->nombreGrupo, 'iconoVista' => 'android']);
    }

    public function agregarPublicacion(){
        if(!Auth::check()){
            return response()->json([
                  'status' => 'ERROR',
                  'result' => 'Inicia Sesion para continuar'
            ]);
        }
        $publicacion = new Publicaciones;
        $publicacion->titulo = request('titulo');
        $publicacion->contenido = request('contenido');
        $publicacion->idUsuario = Auth::id();
        $publicacion->idGrupo = request('idGrupo');
        $mytime = Carbon::now();

        $publicacion->fechaCreacion = $mytime->toDateTimeString();
        $publicacion->estadoPublicacion = 2;
        $publicacion->save();
        $liderGrupo = AdministradorGrupo::where('idGrupo', request('idGrupo'))->first();
        $id = Auth::id();
        $permisos = array(
            'eliminar' => $id == $liderGrupo->idUsuario || $id==$publicacion->idUsuario,
            'editar' => $id == $publicacion->idUsuario,
            'aprobar' => $id == $liderGrupo->idUsuario,
            'rechazar' => $id == $liderGrupo->idUsuario
        );

        return response()->json([
              'status' => 'OK',
              'result' => 'Se agrego la publicacion correctamente',
              'posti' => $publicacion,
              'autor' => Auth::user(),
              'permisos' => $permisos
        ]);
    }

    public function obtenerPublicaciones(){
        $publicaciones = Publicaciones::where('idGrupo', request('idGrupo'))->get();
        $liderGrupo = AdministradorGrupo::where('idGrupo', request('idGrupo'))->first();
        $id = 0;

        if(Auth::check()) $id = Auth::id();

        $validas = array();
        $permisos = array();
        foreach ($publicaciones as $value) {
          $estado = $value->estadoPublicacion;

          if($value->estadoPublicacion == 4 ) continue;

          if($liderGrupo->idUsuario == $id || $value->idUsuario == $id || $estado == 1){

             array_push($validas, $value);

             continue;
          }



        }

        foreach ($validas as $value) {

            $permisos[$value->idPublicacion]= array(
                'eliminar' => ($id== $liderGrupo->idUsuario || ($value->estadoPublicacion==2 && $id == $value->idUsuario)),
                'editar' => $id == $value->idUsuario,
                'aprobar' => ($id == $liderGrupo->idUsuario && $estado == 2),
                'rechazar' => ($id == $liderGrupo->idUsuario && $estado == 2)
            );

        }
        $publi = array();

        foreach ($validas as $value) {
           $usuario = Usuario::where('idUsuario', $value->idUsuario)->first();
           $publi[$usuario->idUsuario ] = $usuario;
        }




        return response()->json([
            'status' => 'OK',
            'result' => $validas,
            'usuarios' => $publi,
            'permisos' => $permisos
        ]);
    }

    public function eliminarPublicacion(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
          }

        try{
          $publicacion = Publicaciones::findOrFail(request('idPublicacion'));
          $liderGrupo = AdministradorGrupo::where('idGrupo', $publicacion->idGrupo)->first();

        if(Auth::id() != $liderGrupo->idUsuario && $publicacion->idUsuario != Auth::id()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'No puedes eliminar esta publicacion'
            ]);

        }
        $publicacion->estadoPublicacion = 4;
        $publicacion->save();
        return response()->json([
            'status' => 'OK',
            'result' => 'Publicacion eliminada'
        ]);
        }catch(ModelNotFoundException $ex){
            return response()->json([
                'status' => 'ERROR',
                'result' => $ex
            ]);
        }
    }

    public function aprobarPublicacion(){
      if(!Auth::check()){
          return response()->json([
              'status' => 'ERROR',
              'result' => 'Inicia sesion para continuar'
          ]);
        }

      try{
        $publicacion = Publicaciones::findOrFail(request('idPublicacion'));
        $liderGrupo = AdministradorGrupo::where('idGrupo', $publicacion->idGrupo)->first();

      if(Auth::id() != $liderGrupo->idUsuario){
          return response()->json([
              'status' => 'ERROR',
              'result' => 'No puedes validar esta publicacion'
          ]);

      }
      $publicacion->estadoPublicacion = 1;
      $publicacion->save();
      return response()->json([
          'status' => 'OK',
          'result' => 'Publicacion aprobada',
          'publicacion' => $publicacion
      ]);
      }catch(ModelNotFoundException $ex){
          return response()->json([
              'status' => 'ERROR',
              'result' => $ex
          ]);
      }
    }
    public function rechazarPublicacion(){
      if(!Auth::check()){
          return response()->json([
              'status' => 'ERROR',
              'result' => 'Inicia sesion para continuar'
          ]);
        }

      try{
        $publicacion = Publicaciones::findOrFail(request('idPublicacion'));
        $liderGrupo = AdministradorGrupo::where('idGrupo', $publicacion->idGrupo)->first();

      if(Auth::id() != $liderGrupo->idUsuario){
          return response()->json([
              'status' => 'ERROR',
              'result' => 'No puedes rechazar esta publicacion'
          ]);

      }
      $publicacion->estadoPublicacion = 3;
      $publicacion->save();
      return response()->json([
          'status' => 'OK',
          'result' => 'Publicacion rechazada',
          'publicacion' => $publicacion
      ]);
      }catch(ModelNotFoundException $ex){
          return response()->json([
              'status' => 'ERROR',
              'result' => $ex
          ]);
      }
    }
    public function editarPublicacion(){
      if(!Auth::check()){
          return response()->json([
              'status' => 'ERROR',
              'result' => 'Inicia sesion para continuar'
          ]);
        }

      try{
        $publicacion = Publicaciones::findOrFail(request('idPublicacion'));
        $liderGrupo = AdministradorGrupo::where('idGrupo', $publicacion->idGrupo)->first();

      if(Auth::id() != $publicacion->idUsuario){
          return response()->json([
              'status' => 'ERROR',
              'result' => 'No puedes editar esta publicacion'
          ]);

      }
      $publicacion->titulo = request('titulo');
      $publicacion->contenido = request('contenido');
      $publicacion->estadoPublicacion = 2;
      $publicacion->save();
      $id = Auth::id();
      $permisos = array(
          'eliminar' => $id == $liderGrupo->idUsuario,
          'editar' => $id == $publicacion->idUsuario,
          'aprobar' => $id == $liderGrupo->idUsuario,
          'rechazar' => $id == $liderGrupo->idUsuario
      );

      return response()->json([
          'status' => 'OK',
          'result' => 'Publicacion editada',
          'publicacion' => $publicacion,
          'permisos' => $permisos
      ]);
      }catch(ModelNotFoundException $ex){
          return response()->json([
              'status' => 'ERROR',
              'result' => $ex
          ]);
      }
    }
    public function subirPortada(){
      try{
        if(request('fila')->extension() != 'jpg' && request('fila')->extension() != 'jpeg' && request('fila')->extension() != 'png'){
            return response()->json([
                  'status' => 'ERROR',
                  'result' => 'Extension invalida'
            ]);
        }
        Storage::deleteDirectory('public/blog/'.request('idGrupo'));
        Storage::put('public/blog/'.request('idGrupo'), request('fila'));

        //request('fila')->storeAs('public/blog/'.request('idGrupo'), 'file.'.request('fila')->extension());

        return response()->json([
            'status' => 'OK',
            'result' => 'Imagen subida correctamente',
        ]);
      }catch(FileNotFoundException $e){
        return response()->json([
            'status' => 'ERROR',
            'result' => 'Imagen dañada',

        ]);
      }


    }

    public function nombrePortada(){
      $files = Storage::files('public/blog/'.request('idGrupo'));

        return response()->json([
            'status' => 'OK',
            'result' => (empty($files)? "":Storage::url($files[0]))
        ]);
    }
}
