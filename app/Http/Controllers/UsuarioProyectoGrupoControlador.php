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

class UsuarioProyectoGrupoControlador extends Controller
{
    public function obtenerInformacion(){
        $usuarioProyectoGrupo = new UsuarioProyectoGrupo;
        $proyecto = new Proyecto;
        $proyectoGrupo = new ProyectoGrupo;
        $query = $usuarioProyectoGrupo->where('idUsuario', '=', request('idUsuario'))->get();
        $arrays = array();
        foreach ($query as $value) {
            array_push($arrays, $value->idProyectoGrupo);
        }

        $proyectos = $proyectoGrupo->whereIn('idProyectoGrupo',$arrays);
        $proyectos = $proyectos->get();

        $respuesta = array();
        foreach ($proyectos as $value) {
            array_push(
                $respuesta, 
                $this->obtenerInformacionGrupo($value->idProyecto)
            );
        }


        return response()->json([
                'status'=> 'OK',
                'result'=>$respuesta
                ]);

    }

    public function obtenerInformacionGrupo($idProyecto){

        $proyecto = new Proyecto;
        $lider = new AdministradorProyecto;
        $usuario = new User;

        $info = $proyecto->where([
                                ['idProyecto', '=', $idProyecto]
                             ])->get();
        $query = $lider->where([
                                ['idProyecto', '=', $idProyecto]
                              ])->get();
        $liderInfo = $usuario->where('idUsuario', '=', $query[0]->idUsuario)->get();
        //$info->tesla = $query[0]->idUsuario;
        //$nueva->tesla = $query[0]->idUsuario;;
        return array(
                    'proyecto'=>$info[0],
                    'lider'=>$liderInfo[0]
               );
    }

    public function agregarUsuarioProyecto(){
        $nuevos = request('integrantes');

        $proyectoGrupo = ProyectoGrupo::where('idProyecto', '=', request('idProyecto'))->first();

        foreach($nuevos as $value){
            $usuario = new usuarioProyectoGrupo;
            $usuario->idUsuario = $value;
            $usuario->idProyectoGrupo = $proyectoGrupo->idProyectoGrupo;
            $usuario->save();
        }

        return response()->json([
            'status' => 'OK',
            'result' => 'Usuario(s) agregado(s)'
        ]);

    }
}
