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
use Auth;

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

        $tareaProyectoGrupo = TareaProyectoGrupo::where('idTarea', '=', request('idTarea'))->first();
        $tareaUsuario = new TareaUsuario;
        $tareaUsuario->idUsuario = request('idUsuario');
        $tareaUsuario->idTareaProyectoGrupo = $tareaProyectoGrupo->idTareaProyectoGrupo;
        $tarea->estado = 3;
        $tarea->save();

        return response()->json([
                'status' => 'OK',
                'result' => 'La tarea ha sido asignada correctamente'
          ]);
    }
}
