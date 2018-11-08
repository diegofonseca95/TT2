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
use App\Sprint;
use App\SprintProyectoGrupo;
use App\TareaProyectoGrupo;
use App\Tarea;
use App\TareaUsuario;
use App\TareaSprint;
use App\Usuario;
use Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;

class TareaControlador extends Controller
{
    public function agregarTarea(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }
        $proyectoGrupo = ProyectoGrupo::where('idProyecto', request('idProyecto'))->first();
        $val = TareaProyectoGrupo::where('idProyectoGrupo', $proyectoGrupo->idProyectoGrupo)->count();

        $tarea = new Tarea;
        $tarea->numeroTarea = $val+1;
        $tarea->descripcion = request('descripcion');
        $tarea->puntaje = request('puntaje');
        $tarea->evidencia = request('evidencia');
        $tarea->estado = 2;
        $tarea->save();

        $tareaProyectoGrupo = new TareaProyectoGrupo;
        $tareaProyectoGrupo->idTarea = $tarea->idTarea;
        $tareaProyectoGrupo->idProyectoGrupo = $proyectoGrupo->idProyectoGrupo;
        $tareaProyectoGrupo->save();

        return response()->json([
            'status' => 'OK',
            'result' => 'Tarea agregada',
            'tarea' => $tarea
        ]);
    }

    public function obtenerTareas(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }

        $proyectoGrupo = ProyectoGrupo::where('idProyecto', request('idProyecto'))->first();
        $respuesta = tareaProyectoGrupo::where([['idProyectoGrupo', $proyectoGrupo->idProyectoGrupo]])->get();

        $array = array();

        foreach ($respuesta as $value) {
            array_push($array, $value->idTarea);
        }

        $result = Tarea::whereIn('idTarea', $array)->get();
        $fin = array();
        foreach ($result as $value) {
           if($value->estado != 1)
              array_push($fin, $value);
        }
        $asignar = array();
        foreach ($fin as  $value) {
          if($value->estado != 1 && $value->estado != 2)
          array_push($asignar, $value->idTarea);

        }
        return response()->json([
            'status' =>'OK',
            'result' => $fin,
            'asignadas' => $asignar
        ]);
    }

    public function eliminarTarea(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }

        Tarea::where('idTarea', '=', request('idTarea'))->update(['estado' => 1]);

        return response()->json([
              'status' =>'OK',
              'result' => 'Tarea eliminada'
          ]);


    }

    public function asignarTarea(){
        if(!Auth::check()){
          return response()->json([
              'status' => 'ERROR',
              'result' => 'Inicia sesion para continuar'
          ]);
        }

        $tarea = Tarea::where('idTarea', '=', request('idTarea'))->first();

        if($tarea->estado != 2){
           return response()->json([
                  'status' => 'ERROR',
                  'result' => 'La tarea ya ha sido asignada anteriormente'
             ]);
        }

        $cont = TareaSprint::where([['idSprint', '=', request('idSprint')], ['idTarea', '=', request('idTarea')]])->count();
        $sprint = Sprint::where('idSprint', '=', request('idSprint'))->first();
        $date = new \DateTime();

        if($sprint->fecha_fin < $date->format('Y-m-d') || $cont > 0){
              return response()->json([
                    'status' => 'ERROR',
                    'result' => ($cont>0 ? 'Esta tarea ya pertenece al sprint':'Sprint no activo')
              ]);
        }

        $tareaProyectoGrupo = TareaProyectoGrupo::where('idTarea', '=', request('idTarea'))->first();
        $tareaUsuario = new TareaUsuario;
        $tareaUsuario->idUsuario = request('idUsuario');
        $tareaUsuario->idTareaProyectoGrupo = $tareaProyectoGrupo->idTareaProyectoGrupo;
        $tareaUsuario->save();

        $tarea->estado = 3;
        $tarea->save();

        $tareasprint = new TareaSprint;
        $tareasprint->idSprint = request('idSprint');
        $tareasprint->idTarea = request('idTarea');
        $tareasprint->save();

        return response()->json([
                'status' => 'OK',
                'result' => 'La tarea ha sido asignada correctamente'
          ]);
    }

    public function iniciarTarea(){
        if(!Auth::check()){
          return response()->json([
              'status' => 'ERROR',
              'result' => 'Inicia sesion para continuar'
          ]);
        }

        $idUser = Auth::id();

        $tareaProyectoGrupo = TareaProyectoGrupo::where('idTarea', request('idTarea'))->first();
        $tareaUsuario = TareaUsuario::where('idTareaProyectoGrupo', $tareaProyectoGrupo->idTareaProyectoGrupo)->first();
        $encargado = Usuario::where('idUsuario', $tareaUsuario->idUsuario)->first();

        if($idUser != $encargado->idUsuario){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'No tienes permiso para iniciar esta tarea'
            ]);
        }

        try{
            $tarea = Tarea::findOrFail(request('idTarea'));

            if($tarea->estado != 3){
                return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Esta tarea ya habia sido iniciada anteriormente'
                ]);
            }

            $tarea->estado = 4;
            $tarea->save();

            return response()->json([
                'status' => 'OK',
                'result' => 'Tarea iniciada'
            ]);
        }catch(ModelNotFoundException $e){
          return response()->json([
              'status' => 'ERROR',
              'result' => 'Tarea no existe'
          ]);
        }


    }
    public function subirEvidencia(){
      try{
        $tarea = Tarea::findOrFail(request('idTarea'));

        Storage::deleteDirectory('public/evidencias/'.request('idTarea'));
        Storage::put('public/evidencias/'.request('idTarea'), request('fila'));

        $tarea->estado = 7;
        $tarea->save();
        //request('fila')->storeAs('public/blog/'.request('idGrupo'), 'file.'.request('fila')->extension());

        return response()->json([
            'status' => 'OK',
            'result' => 'Imagen subida correctamente',
        ]);
      }catch(FileNotFoundException $e){
        return response()->json([
            'status' => 'ERROR',
            'result' => 'Error al subir el archivo',
        ]);
      }catch(ModelNotFoundException $e){
        return response()->json([
            'status' => 'ERROR',
            'result' => 'Tarea no existe',
        ]);
      }


    }

    public function descargarEvidencia(){
      try{
        $tarea = Tarea::findOrFail(request('idTarea'));
        $files = Storage::files('public/evidencias/'.request('idTarea'));
        //request('fila')->storeAs('public/blog/'.request('idGrupo'), 'file.'.request('fila')->extension());
        if(empty($files)){
          return response()->json([
              'status' => 'ERROR',
              'result' => 'No hay evidencia',
          ]);
        }
        return Storage::download($files[0], "evidenciaTarea".request('idTarea'), []);
      }catch(ModelNotFoundException $e){
        return response()->json([
            'status' => 'ERROR',
            'result' => 'Tarea no existe',
        ]);
      }
    }
}
