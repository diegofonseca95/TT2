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
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Auth;
use App\Superadministrador;

class ProyectosControlador extends Controller
{
    public function administrarProyectos(){
        if(!Auth::check()){
            return view('index');
        }

        if(Superadministrador::where('idUsuario', Auth::id())->count()== 0){
            return view('user_watch_dashboard', ['idUsuario' => Auth::id(), 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);
        }


        return view('superadmin_watch_projects',  ['nombreVista'=> 'Proyectos', 'iconoVista' => 'assignment']);
    }

    public function verProyectos(){
        if(!Auth::check()){
            return view('index');
        }

        if(Superadministrador::where('idUsuario', Auth::id())->count()== 0){
            return view('user_watch_dashboard', ['idUsuario' => Auth::id(), 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);
        }
        return view('admin_manage_projects_list', ['nombreVista'=> 'Proyectos', 'iconoVista' => 'computer']);
    }

    public function verProyecto($idProyecto){
        if(!Auth::check()){
            return view('index');
        }
        $pg = ProyectoGrupo::where('idProyecto', '=', $idProyecto)->first();
        $grupoActivo = Grupo::where([['idGrupo', $pg->idGrupo],['estado', 1]])->count();

        $pertenece = UsuarioProyectoGrupo::where([['idUsuario', '=', Auth::id()],['idProyectoGrupo', '=', $pg->idProyectoGrupo]])->count();
        $activo = Proyecto::where([['idProyecto', $idProyecto],['estado', '!=', 3]])->count();
        if($grupoActivo && $activo && ($pertenece || Superadministrador::where('idUsuario', Auth::id())->count() > 0))
          return view('admin_watch_project', ['nombreVista'=> 'Proyectos', 'iconoVista' => 'assignment', 'idProyecto'=> $idProyecto, 'idGrupo' => $pg->idGrupo]);

        if(Superadministrador::where('idUsuario', Auth::id())->count() == 0)
          return view('user_watch_dashboard', ['idUsuario' => Auth::id(), 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);

        return view('admin_index', [ 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);
    }


    public function agregarProyectoBD(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }

        $grupoActivo = Grupo::where([['idGrupo', request('idGrupo')],['estado', 1]])->count();
        $liderGrupo = AdministradorGrupo::where([['idUsuario', Auth::id()],['idGrupo', request('idGrupo')]])->count();
        if(!$grupoActivo || !$liderGrupo ){
          return response()->json([
                'status' => 'ERROR',
                'result' => 'No tienes permiso para agregar proyectos en este grupo'
          ]);
        }
        $filter = Proyecto::where('nombreProyecto', '=', request('nombreProyecto'))->get();
        $idsFilter = array();
        foreach ($filter as $value) {
            array_push($idsFilter, $value->idProyecto);
        }
        $cont = ProyectoGrupo::whereIn('idProyecto', $idsFilter)->where('idGrupo', '=', request('idGrupo'))->count();

        if($cont > 0){
            return response()->json([
                  'status' => 'ERROR',
                  'result' => 'Ya existe un proyecto con ese nombre dentro del grupo'
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

    public function editarProyecto(){
        if(!Auth::check()){
            return view('index');
        }
        try{
            $proyecto = Proyecto::findOrFail(request('idProyecto'));
            $proyecto->descripcion = request('descripcion');
            $proyecto->nombreProyecto = request('nombreProyecto');
            $proyecto->save();
            $administrarProyecto = AdministradorProyecto::where('idProyecto', '=', $proyecto->idProyecto)->update(['idUsuario' => request('idUsuario')]);


            return response()->json([
                'status'=> 'OK',
                'result' => 'Informacion actualizada'
                ]);
        }catch(ModelNotFoundException $e){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Proyecto no existe'
                ]);
        }
    }

    public function obtenerProyecto(){
        if(!Auth::check()){
            return view('index');
        }

        $proyecto = new Proyecto;
        $lider = new AdministradorProyecto;

        $info = $proyecto->where([['idProyecto', '=', request('idProyecto')]])->get();
        $query = $lider->where([['idProyecto', '=', request('idProyecto')]])->get();
        //$info->tesla = $query[0]->idUsuario;
        //$nueva->tesla = $query[0]->idUsuario;;
        $proyectoGrupo = ProyectoGrupo::where('idProyecto', request('idProyecto'))->first();
        $liderGrupo = AdministradorGrupo::where('idGrupo', $proyectoGrupo->idGrupo)->first();
        return response()->json([
                'status'=> 'OK',
                'result'=> array(
                    'proyecto'=>$info[0],
                    'lider'=>$query[0]->idUsuario,
                    'permiso' =>(($info[0]->estado == 1)&& ($query[0]->idUsuario == Auth::id() || $liderGrupo->idUsuario == Auth::id())),
                    'activo' =>( $info[0]->estado == 1)
                )
                ]);
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
            if($value->estado == 1)
                array_push($arrays, $value->idUsuario);
        }

        /*$usuarios = $usuario->whereIn('idUsuario', $arrays)->get();*/

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

        return response()->json([
          'status' => 'OK',
          'result' => $proyecto->where('estado', '!=', 3)->get()
        ]);
    }
    public function permisosProyecto(){
            if(!Auth::check()){
                return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
                ]);
            }
            $liderProyecto = AdministradorProyecto::where('idProyecto', request('idProyecto') )->first();
            $proyecto = Proyecto::where('idProyecto', request('idProyecto'))->first();
            return response()->json([
                'status' => 'OK',
                'result' => array('eliminar' => ($proyecto->estado == 1 && $liderProyecto->idUsuario == Auth::id()),
                'editar' => ($proyecto->estado == 1 && $liderProyecto->idUsuario == Auth::id())
              )
            ]);
    }
    public function terminarProyecto(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }
        try{
            $proyecto = Proyecto::findOrFail(request('idProyecto'));
            $proyecto->estado = 2;
            $proyecto->save();

            return response()->json([
                'status' => 'OK',
                'result' => 'El proyecto ha sido finalizado',
                'permiso' => array('eliminar' => false,
                'editar' => false
              )
            ]);
        }catch(Exception $ex){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Proyecto no existe'
                ]);
        }
    }
}
