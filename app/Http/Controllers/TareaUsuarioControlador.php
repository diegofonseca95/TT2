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
    public function UsuarioTarea(){

          $tareaUsuario = TareaUsuario::where('idUsuario', '=', request('idUsuario'))->get();
          $idTareaGrupo = array();
          foreach ($tareaUsuario as $value) {
              array_push($idTareaGrupo, $value->idTareaProyectoGrupo);
          }

          $idTareas = TareaProyectoGrupo::whereIn('idTareaProyectoGrupo', $idTareaGrupo)->get();

          $result = array();
          foreach($idTareas as $value){
              array_push($result, obtenerInformacion($value));
          }


          return response()->json([
                'status' => 'OK',
                'result' => $result
            ]);

    }

    public function obtenerInformacion($tareaProyectoGrupo){
        $tareas = Tarea::whereIn('idTarea', $idTareas)->first();
        $proyectoGrupo = ProyectoGrupo::where
                            (
                              'idProyectoGrupo',
                              '=',
                              $tareaProyectoGrupo->idProyectoGrupo
                            )->first();
        $proyecto = Proyecto::where('idProyecto', '=', $proyectoGrupo->idProyecto)->first();
        $grupo = Proyecto::where('idProyecto', '=', $proyectoGrupo->idGrupo)->first();

        return response()->json([
              'proyecto' => $proyecto,
              'grupo' => $grupo,
              'tarea' => $tarea
          ]);
    }
}
