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
use App\SprintProyectoGrupo;
use App\Sprint;
use App\Tarea;
use Auth;
use App\TareaProyectoGrupo;
use App\UsuarioProyectoGrupo;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Superadministrador;
use App\TareaSprint;
use App\TareaUsuario;
class EstadisticasControlador extends Controller
{
      public function usuariosGrupo(){
            if(!Auth::check()){
                return response()->json([
                      'status' => 'ERROR',
                      'result' => 'Inicia sesion para continuar'
                  ]);
            }

            $grupos = Grupo::where('estado', 1)->get();
            $estadisticas = array();
            $eliminados = array();
            foreach ($grupos as $value) {
                $estadisticas[$value->idGrupo] = UsuarioGrupo::where([['idGrupo', $value->idGrupo],['estado', 1]])->count();
                $eliminados[$value->idGrupo] = UsuarioGrupo::where([['idGrupo', $value->idGrupo],['estado', 3]])->count();
            }

            return response()->json([
                  'status' => 'OK',
                  'result' => array(
                      'grupos' => $grupos,
                      'cantidad' => $estadisticas,
                      'eliminados' => $eliminados
                  )
              ]);
      }
      public function proyectosGrupo(){
          if(!Auth::check()){
              return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
                ]);
          }

          $grupos = Grupo::where('estado', 1)->get();
          $estadisticas = array();
          $eliminados = array();
          foreach ($grupos as $value) {
              $proyectos = ProyectoGrupo::where('idGrupo', $value->idGrupo)->get();
              $ids = array();
              foreach ($proyectos as  $value) {
                  array_push($ids, $value->idProyecto);
              }
              $estadisticas[$value->idGrupo] = Proyecto::whereIn('idProyecto', $ids)->where('estado', 1)->count();
              $eliminados[$value->idGrupo] = Proyecto::whereIn('idProyecto', $ids)->where('estado', 3)->count();
          }

          return response()->json([
                'status' => 'OK',
                'result' => array(
                    'grupos' => $grupos,
                    'cantidad' => $estadisticas,
                    'eliminados' => $eliminados
                )
            ]);
      }
      public function tareasProyecto(){
          if(!Auth::check()){
              return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
                ]);
          }
          $proyectos = Proyecto::where('estado', 1)->get();
          $estadisticas = array();
          $terminadas = array();

          foreach ($proyectos as $value) {
              $proyectoGrupo = ProyectoGrupo::where('idProyecto', $value->idProyecto)->first();

              $estadisticas[$value->idProyecto] = TareaProyectoGrupo::where('idProyectoGrupo', $proyectoGrupo->idProyectoGrupo)->count();
              $t = TareaProyectoGrupo::where('idProyectoGrupo', $proyectoGrupo->idProyectoGrupo)->get();
              $cont = 0;
              foreach ($t as  $valuet) {
                  $cont += Tarea::where([['idTarea', $valuet->idTarea], ['estado', 5]])->count();
              }
                $terminadas[$value->idProyecto] = $cont;
          }
          return response()->json([
                'status' => 'OK',
                'result' => array(
                    'proyectos' => $proyectos,
                    'cantidad' => $estadisticas,
                    'terminadas' => $terminadas
                )
            ]);
      }
      public function iteracionesProyecto(){
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
                    'proyectos' => $proyectos,
                    'cantidad' => $estadisticas
                )
            ]);

      }
      public function verEstadisticas(){
            if(!Auth::check()){
              return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
                ]);
            }

            return view('statistics',  ['nombreVista' => 'Estadisticas', 'iconoVista' => 'assessment']);
      }

      public function UsuarioTareas(){
            if(!Auth::check()){
              return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
                ]);
            }
          $usuarioProyectoGrupo = UsuarioProyectoGrupo::where('idUsuario', request('idUsuario'))->get();
          $proyectosgrupoid = array();
          $proyectos = array();
          $prueba = array();
          foreach ($usuarioProyectoGrupo as  $value) {
              array_push($proyectosgrupoid, $value->idProyectoGrupo);
          }
          $proyectogrupo = ProyectoGrupo::whereIn('idProyectoGrupo', $proyectosgrupoid)->get();
          foreach ($proyectogrupo as $value) {
              array_push($proyectos, Proyecto::where('idProyecto', $value->idProyecto)->first());
          }
          $nombreProyecto = array();
          $fechas = array();
          $prueba = array();

          foreach ($proyectos as $value) {
              $proyectoGrupo = ProyectoGrupo::where('idProyecto', $value->idProyecto)->first();
              array_push($nombreProyecto, $value->nombreProyecto);
              $sprintProyectoGrupo = SprintProyectoGrupo::where('idProyectoGrupo', $proyectoGrupo->idProyectoGrupo)->get();
              $idsSprint = array();
              foreach ($sprintProyectoGrupo as  $value1) {
                  array_push($idsSprint, $value1->idSprint);
              }
              $sprints = Sprint::whereIn('idSprint', $idsSprint)->get();

              $puntaje = array();

              foreach($sprints as $value1){
                  array_push($fechas, $value1->fecha_fin);
              }
              foreach ($sprints as $value1) {
                  $cont = 0;
                  $tareasSprint = TareaSprint::where('idSprint', $value1->idSprint)->get();
                  $idTareas = array();
                  foreach ($tareasSprint as $value2) {
                      array_push($idTareas, $value2->idTarea);
                  }

                  $tareaProyectoGrupo = TareaProyectoGrupo::whereIn('idTarea', $idTareas)->get();
                  $idstareaproyectogrupo = array();
                  $valoresTarea = array();
                  foreach ($tareaProyectoGrupo as $value2) {
                    $temp = Tarea::where('idTarea', $value2->idTarea)->first();

                    $valoresTarea[$value2->idTareaProyectoGrupo] = $temp->puntaje;
                     array_push($idstareaproyectogrupo, $value2->idTareaProyectoGrupo);
                  }
                  $usuarioTarea = TareaUsuario::whereIn('idTareaProyectoGrupo', $idstareaproyectogrupo)->get();
                  foreach ($usuarioTarea as $value2) {
                      if($value2->idUsuario == request('idUsuario')){
                          $cont += $valoresTarea[$value2->idTareaProyectoGrupo];
                      }

                  }
                  if(array_key_exists($value1->fecha_fin, $puntaje)){
                      $puntaje[$value1->fecha_fin] += $cont;
                  }else{
                      $puntaje[$value1->fecha_fin] = $cont;
                  }

              }
              $info[$value->idProyecto] = $puntaje;

          }
          sort($fechas);
          $fechasset = array();
          if(sizeof($fechas) > 0)
            array_push($fechasset, $fechas[0]);

          for($key = 1; $key < sizeof($fechas); $key+= 1) {
              if($fechas[$key-1] != $fechas[$key]){
                 array_push($fechasset, $fechas[$key]);
              }
          }
          $fechasvalor = array();

          foreach ($fechasset as $value) {
              $fechasvalor[$value] = array();

          }
          foreach ($proyectos as $value) {
                foreach ($fechasset as $fecha) {
                    if(array_key_exists($fecha, $info[$value->idProyecto])){
                        array_push($fechasvalor[$fecha],  $info[$value->idProyecto][$fecha]);
                    }else{
                        array_push($fechasvalor[$fecha], 0);
                    }
                }
          }
          return response()->json([
                  'status' => 'OK',
                  'result' => $fechasvalor,
                  'nombres' => $nombreProyecto
            ]);
      }
}
