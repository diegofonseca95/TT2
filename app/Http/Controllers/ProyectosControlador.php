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

class ProyectosControlador extends Controller
{
    public function administrarProyectos(){
        if(!Auth::check()){
            return view('index');
        }

        $proyecto = new Proyecto;

        $query = $proyecto->get();

        return view('admin_manage_projects', ['proyectos'=> $query]);
    }

    public function verProyectos(){
        if(!Auth::check()){
            return view('index');
        }

        return view('admin_manage_projects_list', ['nombreVista'=> 'Proyectos', 'iconoVista' => 'computer']);
    }

    public function verProyecto($idProyecto){
        if(!Auth::check()){
            return view('index');
        }
        $pg = ProyectoGrupo::where('idProyecto', '=', $idProyecto)->first();
        return view('admin_watch_project', ['nombreVista'=> 'Proyectos', 'iconoVista' => 'assignment', 'idProyecto'=> $idProyecto, 'idGrupo' => $pg->idGrupo]);
    }
    public function agregarProyecto(){
        if(!Auth::check()){
            return view('index');
        }

        $usuario = new User;
        $query = $usuario->where('estado', '!=', 0)->get();

        return view('admin_create_projects', [ 'usuarios' => $query]);
    }

    public function obtenerLiderTabla(){
        if(!Auth::check()){
            return view('index');
        }

        $usuario = new User;
        $query = $usuario->whereIn('idUsuario', request("usuarios"))->get();

        return view('tabla_lider',['usuarios' => $query]);
    }

    public function agregarProyectoBD(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }

        $proyecto = new Proyecto;
        $proyecto->nombreProyecto = request("nombreProyecto");
        $proyecto->descripcion = request("descripcion");
        $date = new \DateTime();
        $proyecto->fecha_inicio = $date->format('Y-m-d');
        $proyecto->save();

        $administrarProyecto = new AdministradorProyecto;
        $administrarProyecto->idUsuario = request("lider");
        $administrarProyecto->idProyecto = $proyecto->idProyecto;
        $administrarProyecto->save();

        $proyectoGrupo = new ProyectoGrupo;
        $proyectoGrupo->idProyecto = $proyecto->idProyecto;
        $proyectoGrupo->idGrupo = request("idGrupo");
        $proyectoGrupo->save();

        $integrantes = request("integrantes");

        foreach($integrantes as $value) {
            $usarioproyectogrupo = new UsuarioProyectoGrupo;
            $usarioproyectogrupo->idProyectoGrupo = $proyectoGrupo->idProyectoGrupo;
            $usarioproyectogrupo->idUsuario = $value;
            $usarioproyectogrupo->save();
        }

        return response()->json([
            'status' => 'OK',
            'result' => 'Se agregó el proyecto con exito'
        ]
        );
    }

    public function editarProyecto($idProyecto){
        if(!Auth::check()){
            return view('index');
        }

        $proyecto = new Proyecto;

        $query = $proyecto->where(
                    'idProyecto',
                    '=',
                    $idProyecto
                 )->get();

        return view("admin_manage_projects", ['proyecto'=> $query[0]]);
    }

    public function obtenerProyecto(){
        if(!Auth::check()){
            return view('index');
        }

        $proyecto = new Proyecto;

        $query = $proyecto->where(
                    'idProyecto',
                     '=', 
                     request('idProyecto')
                 )->get();

        return $query;
    }

    public function eliminarProyecto(){
        if(!Auth::check()){
            return view('index');
        }

        try{
            $proyecto = Proyecto::findOrFail(request('idProyecto'));
            $proyecto->estado = 3;
            $proyecto->save();

            return response()->json([
                'status'=> 'OK',
                'result'=> 'El proyecto ha sido eliminado'
                ]);
        }catch(Exception $ex){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Proyecto no existe'
                ]);
        }
    }

    public function obtenerUsuariosProyecto(){
        if(!Auth::check()){
            return response()->json([
                'status' =>'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }

        $usuarioProyectoGrupo = new UsuarioProyectoGrupo;
        $usuario = new User;
        $proyectoGrupo= new ProyectoGrupo;

        $query = $proyectoGrupo->where('idProyecto', '=', request('idProyecto'))->get();
        $arrays = array();
        foreach ($query as $value) {
            array_push($arrays, $value->idProyectoGrupo);
        }

        $result = $usuarioProyectoGrupo->whereIn('idProyectoGrupo', $arrays)->get();

        $arrays = array();
        foreach ($result as $value) {
            array_push($arrays, $value->idUsuario);
        }

        $usuarios = $usuario->whereIn('idUsuario', $arrays)->get();

        return response()->json([
            'status' => 'OK',
            'result' => $arrays
        ]);
    }

    public function obtenerProyectos(){
        if(!Auth::check()){
            return view('index');
        }

        $proyecto = new Proyecto;
        
        return $proyecto->where('estado', '!=', 3)->get();
    }
}
