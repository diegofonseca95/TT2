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
use App\Http\Controllers\SprintControlador;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;
use App\Events\Logs;
use App\Http\Controllers\NotificacionesControlador;

class TareaControlador extends Controller
{
    public function agregarTarea(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }
        if(AdministradorProyecto::where([['idProyecto', request('idProyecto')],['$idUsuario', Auth::id()]])->count() == 0){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'No tienes permiso para agregar tareas en este proyecto'
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
        if(UsuarioProyectoGrupo::where([['idProyectoGrupo', $proyectoGrupo->idProyectoGrupo],['idUsuario', Auth::id()]])->count() == 0){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'No tienes permiso para ver este proyecto'
            ]);
        }
        $proyectoGrupo = ProyectoGrupo::where('idProyecto', request('idProyecto'))->first();
        
        if(UsuarioProyectoGrupo::where([['idProyectoGrupo', $proyectoGrupo->idProyectoGrupo],['idUsuario', Auth::id()]])->count() == 0){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'No tienes permiso para ver este proyecto'
            ]);
        }
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
        $tarea = Tarea::where('idTarea', request('idTarea'))->first();
        $tareaProyectoGrupo = TareaProyectoGrupo::where('idTarea', $tarea->idTarea)->first();
        $proyectoGrupo = ProyectoGrupo::where('idProyectoGrupo', $tareaProyectoGrupo->idProyectoGrupo)->first();
        event(new Logs($proyectoGrupo->idProyecto, Auth::id(), 'ha eliminado la tarea '.$tarea->descripcion ));
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

        $persona = User::where('idUsuario', request('idUsuario'))->first();
        $proyectoGrupo = ProyectoGrupo::where('idProyectoGrupo', $tareaProyectoGrupo->idProyectoGrupo)->first();
        $proyecto = Proyecto::where('idProyecto', $proyectoGrupo->idProyecto)->first();
        event(new Logs($proyectoGrupo->idProyecto, Auth::id(), 'ha asignado una tarea a '.$persona->nombre.' '.$persona->apellidoPaterno.' '.$persona->apellidoMaterno ));

        $sprint = Sprint::where('idSprint', request('idSprint'))->first();
        NotificacionesControlador::nuevaNotificacion($persona->idUsuario, 'Te han asignado una nueva tarea en el proyecto '.$proyecto->nombreProyecto.' en la iteracion '.$sprint->numeroSprint);

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
            $s = new SprintControlador;
            $tarea->estado = 4;
            $tarea->save();
            return response()->json([
                'status' => 'OK',
                'result' => 'Tarea iniciada',
                'tarea' => $s->informacionTarea($tarea)
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

        Storage::deleteDirectory('evidencias/'.request('idTarea'));
        Storage::put('evidencias/'.request('idTarea'), request('fila'));

        $tarea->estado = 7;
        $tarea->save();
        //request('fila')->storeAs('public/blog/'.request('idGrupo'), 'file.'.request('fila')->extension());
        $s = new SprintControlador;

        return response()->json([
            'status' => 'OK',
            'result' => 'Archivo subido correctamente',
            'tarea' => $s->informacionTarea($tarea)
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

    public function descargarEvidencia($idTarea){
      try{

        $tarea = Tarea::findOrFail($idTarea);
        $files = Storage::files('evidencias/'.$idTarea);
        //request('fila')->storeAs('public/blog/'.request('idGrupo'), 'file.'.request('fila')->extension());
        if(empty($files)){
          return response()->json([
              'status' => 'ERROR',
              'result' => 'No hay evidencia',
          ]);
        }
        $ext = pathinfo($files[0], PATHINFO_EXTENSION);
        //return response('Acceso denegado', 401);
        return Storage::download($files[0], "evidenciaTarea".$idTarea.'.'.$ext, []);
      }catch(ModelNotFoundException $e){
        return response()->json([
            'status' => 'ERROR',
            'result' => 'Tarea no existe',
        ]);
      }
    }

    public function validarEvidencia(){
        $id = 0;
        if(Auth::check()) $id = Auth::id();
        try{
            $tarea = Tarea::findOrFail(request('idTarea'));
            $tareaProyectoGrupo = TareaProyectoGrupo::where('idTarea', request('idTarea'))->first();
            $proyectoGrupo = ProyectoGrupo::where('idProyectoGrupo', $tareaProyectoGrupo->idProyectoGrupo)->first();
            $proyectoliderId = AdministradorProyecto::where('idProyecto', $proyectoGrupo->idProyecto)->first();
            if($proyectoliderId->idUsuario != $id){
              return response()->json([
                  'status' => 'ERROR',
                  'result' => 'No tienes permiso para validar esta tarea'
              ]);
            }
            $tarea->estado = 5;
            $tarea->save();
            $s = new SprintControlador;
            $tareaUsuario = TareaUsuario::where('idTareaProyectoGrupo', $tareaProyectoGrupo->idTareaProyectoGrupo)->first();
            $proyecto = Proyecto::where('idProyecto', $proyectoGrupo->idProyecto)->first();
            $tareasprint = TareaSprint::where('idTarea', $tarea->idTarea)->first();
            $sprint = Sprint::where('idSprint', $tareasprint->idSprint)->first();

            NotificacionesControlador::nuevaNotificacion($tareaUsuario->idUsuario, 'Te han validado la tarea '.$tarea->descripcion.' en el proyecto '.$proyecto->nombreProyecto.' en la iteracion '.$sprint->numeroSprint);

            return response()->json([
                'status' => 'OK',
                'result' => 'Tarea validada',
                'tarea' => $s->informacionTarea($tarea)
            ]);
        }catch(ModelNotFoundException $e){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Tarea no disponible'
            ]);
        }

    }
    public function rechazarEvidencia(){
        $id = 0;
        if(Auth::check()) $id = Auth::id();
        try{
            $tarea = Tarea::findOrFail(request('idTarea'));
            $tareaProyectoGrupo = TareaProyectoGrupo::where('idTarea', request('idTarea'))->first();
            $proyectoGrupo = ProyectoGrupo::where('idProyectoGrupo', $tareaProyectoGrupo->idProyectoGrupo)->first();
            $proyectoliderId = AdministradorProyecto::where('idProyecto', $proyectoGrupo->idProyecto)->first();
            if($proyectoliderId->idUsuario != $id){
              return response()->json([
                  'status' => 'ERROR',
                  'result' => 'No tienes permiso para rechazar esta tarea'
              ]);
            }
            $tarea->estado = 6;
            $tarea->save();
            $s = new SprintControlador;
            $tareaUsuario = TareaUsuario::where('idTareaProyectoGrupo', $tareaProyectoGrupo->idTareaProyectoGrupo)->first();
            $proyecto = Proyecto::where('idProyecto', $proyectoGrupo->idProyecto)->first();
            $tareasprint = TareaSprint::where('idTarea', $tarea->idTarea)->first();
            $sprint = Sprint::where('idSprint', $tareasprint->idSprint)->first();

            NotificacionesControlador::nuevaNotificacion($tareaUsuario->idUsuario, 'Te han rechazado la tarea '.$tarea->descripcion.' en el proyecto '.$proyecto->nombreProyecto.' en la iteracion '.$sprint->numeroSprint);
            return response()->json([
                'status' => 'OK',
                'result' => 'Tarea rechazada',
                'tarea' => $s->informacionTarea($tarea)
            ]);
        }catch(ModelNotFoundException $e){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Tarea no disponible'
            ]);
        }

    }
}
