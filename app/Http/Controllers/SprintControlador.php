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
use Illuminate\Database\Eloquent\ModelNotFoundException;

use Auth;

class SprintControlador extends Controller
{
    public function agregarSprint(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }
        $proyectoGrupo = ProyectoGrupo::where('idProyecto', request('idProyecto'))->first();
        $val = SprintProyectoGrupo::where('idProyectoGrupo', $proyectoGrupo->idProyectoGrupo)->count();

        $sprintProyectoGrupo = new SprintProyectoGrupo;
        $sprintProyectoGrupo->idProyectoGrupo = $proyectoGrupo->idProyectoGrupo;

        $sprint = new Sprint;
        $sprint->numeroSprint = $val+1;
        $date = new \DateTime();
        $sprint->fecha_inicio = $date->format('Y-m-d');
        $sprint->fecha_fin = request("fecha_fin");;
        $sprint->save();
        $sprintProyectoGrupo->idSprint = $sprint->idSprint;
        $sprintProyectoGrupo->save();

        return response()->json([
            'status' => 'OK',
            'result' => 'Iteracion agregada',
            'sprint' => $sprint
        ]);
    }

    public function obtenerSprints(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }

        $proyectoGrupo = ProyectoGrupo::where('idProyecto', request('idProyecto'))->first();
        $respuesta = SprintProyectoGrupo::where('idProyectoGrupo', $proyectoGrupo->idProyectoGrupo)->get();

        $array = array();

        foreach ($respuesta as $value) {
            array_push($array, $value->idSprint);
        }

        $result = Sprint::whereIn('idSprint', $array)->get();

        return response()->json([
            'status' =>'OK',
            'result' => $result
        ]);
    }

    public function obtenerSprint(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }
        $sprint = Sprint::where('idSprint', '=', request('idSprint'))->first();

        $sprintProyectoGrupo = SprintProyectoGrupo::where('idSprint', '=', request('idSprint'))->first();
        $proyectoGrupo = ProyectoGrupo::where('idProyectoGrupo', '=', $sprintProyectoGrupo->idProyectoGrupo)->first();
        $proyecto = Proyecto::where('idProyecto', '=', $proyectoGrupo->idProyecto)->first();

        return response()->json([
              'status' => 'OK',
              'result' => array('sprint' => $sprint, 'proyecto' => $proyecto)
        ]);
    }
    public function verSprint($idSprint){
        if(!Auth::check()){
            return view('index');
        }

        return view('user_watch_iteration', ['nombreVista'=> 'Iteracion', 'iconoVista' => 'update', 'idSprint' => $idSprint]);
    }
    public function editarSprint(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }

        try{
            $sprint = Sprint::findOrFail(request('idSprint'));

            if($sprint->fecha_inicio >= request('fecha_fin')){
              return response()->json([
                  'status'=> 'ERROR',
                  'result'=> 'La fecha de fin debe ser mayor a la de inicio'
                  ]);
            }
            $sprint->fecha_fin = request('fecha_fin');
            $sprint->save();
            return response()->json([
                'status'=> 'OK',
                'result'=> 'Se editó la fecha de fin'
                ]);
        }catch(ModelNotFoundException $e){
          return response()->json([
              'status'=> 'ERROR',
              'result'=> 'Iteracion no existe'
              ]);
        }
    }
}
