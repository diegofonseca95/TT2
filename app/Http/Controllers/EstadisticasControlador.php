<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Grupo;
use App\AdministradorGrupo;
use App\AdministradorProyecto;
use App\UsuarioGrupo;
use App\ProyectoGrupo;
use App\Proyecto;
use Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Superadministrador;

class EstadisticasControlador extends Controller
{
      public function UsuariosGrupo(){
            if(!Auth::check()){
                return response()->json([
                      'status' => 'ERROR',
                      'result' => 'Inicia sesion para continuar'
                  ]);
            }

            $grupos = Grupo::where('estado', 1)->get();
            $estadisticas = array();

            foreach ($grupos as $value) {
                $estadisticas[$value->idGrupo] = UsuarioGrupo::where([['idGrupo', $value->idGrupo],['estado', 1]])->count();
            }

            return response()->json([
                  'status' => 'OK',
                  'result' => array(
                      'grupos' => $grupos,
                      'cantidad' => $estadisticas
                  )
              ]);
      }
      public function ProyectosGrupo(){
          if(!Auth::check()){
              return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
                ]);
          }

          $grupos = Grupo::where('estado', 1)->get();
          $estadisticas = array();

          foreach ($grupos as $value) {
              $proyectos = ProyectoGrupo::where('idGrupo', $value->idGrupo)->get();
              $ids = array();
              foreach ($proyectos as  $value) {
                  array_push($ids, $value->idProyecto);
              }
              $estadisticas[$value->idGrupo] = Proyecto::whereIn('idProyecto', $ids)->where('estado', 1)->count();
          }

          return response()->json([
                'status' => 'OK',
                'result' => array(
                    'grupos' => $grupos,
                    'cantidad' => $estadisticas
                )
            ]);
      }
      public function TareasProyecto(){
          if(!Auth::check()){
              return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
                ]);
          }
          $proyectos = Proyecto::where('estado', 1)->get();
          $estadisticas = array();
          foreach ($proyectos as $value) {
              $proyectoGrupo = ProyectoGrupo::where('idProyecto', $value->idProyecto)->first();

              $estadisticas[$value->idProyecto] = TareaProyectoGrupo::where('idProyectoGrupo', $proyectoGrupo->idProyectoGrupo)->count();

          }
          return response()->json([
                'status' => 'OK',
                'result' => array(
                    $proyectos,
                    $estadisticas
                )
            ]);
      }
      public function IteracionesProyecto(){
          if(!Auth::check()){
              return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
                ]);
          }

          $proyectos = Proyecto::where('estado', 1)->get();
          $estadisticas = array();
          foreach ($proyectos as $value) {
              $proyectoGrupo = ProyectoGrupo::where('idProyecto', $value->idProyecto)->first();

              $estadisticas[$value->idProyecto] = SprintProyectoGrupo::where('idProyectoGrupo', $proyectoGrupo->idProyectoGrupo)->count();

          }
          return response()->json([
                'status' => 'OK',
                'result' => array(
                    $proyectos,
                    $estadisticas
                )
            ]);

      }
}
