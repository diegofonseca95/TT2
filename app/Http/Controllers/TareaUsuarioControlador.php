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
use App\Superadministrador;

class TareaUsuarioControlador extends Controller
{
    public function UsuarioTarea(){
          if(!Auth::check()){
              return response()->json([
                  'status' => 'ERROR',
                  'result' => 'Inicia sesion para continuar'
              ]);
          }
          $tareaUsuario = TareaUsuario::where('idUsuario', '=', request('idUsuario'))->get();
          $idTareaGrupo = array();
          foreach ($tareaUsuario as $value) {
              array_push($idTareaGrupo, $value->idTareaProyectoGrupo);
          }

          $idTareas = TareaProyectoGrupo::whereIn('idTareaProyectoGrupo', $idTareaGrupo)->get();

          $result = array();

          foreach($idTareas as $value){
              array_push($result, $this->obtenerInformacion($value));
          }


          return response()->json([
                'status' => 'OK',
                'result' => $result
            ]);

    }

    private function obtenerInformacion($tareaProyectoGrupo){
        $tareas = Tarea::where('idTarea', '=', $tareaProyectoGrupo->idTarea)->first();
        $proyectoGrupo = ProyectoGrupo::where
                            (
                              'idProyectoGrupo',
                              '=',
                              $tareaProyectoGrupo->idProyectoGrupo
                            )->first();
        $proyecto = Proyecto::where('idProyecto', '=', $proyectoGrupo->idProyecto)->first();
        $grupo = Grupo::where('idGrupo', '=', $proyectoGrupo->idGrupo)->first();
        $liderProyecto = AdministradorProyecto::where('idProyecto', $proyecto->idProyecto)->first();
        $isSuper = Superadministrador::where('idUsuario', Auth::id())->count();
        $pertenece = UsuarioProyectoGrupo::where([['idUsuario', Auth::id()],['idProyectoGrupo', $tareaProyectoGrupo->idProyectoGrupo]])->count();
        return array(
                  'proyecto' => $proyecto,
                  'grupo' => $grupo,
                  'tarea' => $tareas,
                  'permiso' => ($tareas->estado > 4) && ((request('idUsuario') == Auth::id()) || $liderProyecto->idUsuario == Auth::id() || $isSuper || ($tareas->estado == 5 && $pertenece))
              );
    }
}
