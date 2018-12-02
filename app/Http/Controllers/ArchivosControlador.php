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
use Illuminate\Support\Facades\Storage;
use League\Flysystem\FileNotFoundException;
use App\Events\Logs;
class ArchivosControlador extends Controller
{
    public function subirArchivo(){
        if(!Auth::check()){
            return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
              ]);
        }
        $proyecto = Proyecto::where('idProyecto', request('idProyecto'))->first();
        if($proyecto->estado == 2){
            return response()->json([
                    'status' => 'ERROR',
                    'result' => 'No puedes subir archivos a un proyecto finalizado'
              ]);
        }
        if($proyecto->estado == 3){
            return response()->json([
                    'status' => 'ERROR',
                    'result' => 'No puedes subir archivos a un proyecto eliminado'
              ]);
        }
        try{


          $size = sizeof($files = Storage::files('archivos/'.request('idProyecto')));
          $size+= 1;
          if(Storage::disk('local')->exists('archivos/'.request('idProyecto').'/'.request('name')))
          return response()->json([
              'status' => 'ERROR',
              'result' => 'Ya existe un archivo con ese nombre'
          ]);
          //Storage::disk('local')->put('archivos/'.request('idProyecto').'/'.request('name').request('file')->extension(), request('file'));
          Storage::putFileAs('archivos/'.request('idProyecto'), request('file'), request('name'));

          //request('fila')->storeAs('public/blog/'.request('idGrupo'), 'file.'.request('fila')->extension());
          event(new Logs(request('idProyecto'), Auth::id(), 'ha subido un archivo al proyecto' ));
          return response()->json([
              'status' => 'OK',
              'result' => 'Archivo subido correctamente',
          ]);
        }catch(Exception $e){

        }

    }
    public function obtenerArchivos(){
          if(!Auth::check()){
              return response()->json([
                      'status' => 'ERROR',
                      'result' => 'Inicia sesion para continuar'
                ]);
          }
          $files = Storage::files('archivos/'.request('idProyecto'));
          $nombres = array();
          foreach ($files as $value) {
              array_push($nombres, pathinfo($value, PATHINFO_BASENAME));
          }
          return response()->json([
                'status' => 'OK',
                'result' => $nombres
          ]);
    }

    public function descargarArchivo($idProyecto, $nombre){
        if(!Auth::check()){
            return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
              ]);
        }
        try{

          //return response('Acceso denegado', 401);
          return Storage::download('archivos/'.$idProyecto.'/'.$nombre, $nombre, []);
        }catch(FileNotFoundException $e){
          return response()->json([
              'status' => 'ERROR',
              'result' => 'Archivo no existe',
          ]);
        }
    }

    public function administrarArchivos(){
        if(!Auth::check()){
            return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
              ]);
        }

        return view('admin_watch_files',  ['nombreVista'=> 'Archivos', 'iconoVista' => 'attach_file']);
    }

    public function obtenerArchivosGrupos(){
        if(!Auth::check()){
            return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
              ]);
        }
        $proyectosGrupo = ProyectoGrupo::where('idGrupo', request('idGrupo'))->get();
        $result = array();
        foreach ($proyectosGrupo as $value) {
            $files = Storage::files('archivos/'.$value->idProyecto);

            foreach ($files as $valor) {
                array_push(
                  $result,
                  array(
                    'idProyecto' => $value->idProyecto,
                    'nombre' => pathinfo($valor, PATHINFO_BASENAME)
                  )
                );
            }
        }

        return response()->json([
            'status' => 'OK',
            'result' => $result
        ]);
    }
    public function obtenerArchivosProyectos(){
          if(!Auth::check()){
              return response()->json([
                      'status' => 'ERROR',
                      'result' => 'Inicia sesion para continuar'
                ]);
          }
          $files = Storage::files('archivos/'.request('idProyecto'));
          $nombres = array();
          foreach ($files as $value) {
              array_push($nombres, array(
                'idProyecto' => request('idProyecto'),
                'nombre' => pathinfo($value, PATHINFO_BASENAME)));
          }
          return response()->json([
                'status' => 'OK',
                'result' => $nombres
          ]);
    }
}
