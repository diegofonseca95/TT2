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

class GruposControlador extends Controller
{
    public function administrarGrupos(){
        if(!Auth::check()){
            return view('index');
        }
        if(Superadministrador::where('idUsuario', Auth::id())->count() == 0){
            return view('user_watch_dashboard', ['idUsuario' => Auth::id(), 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);
        }
        $grupo = new Grupo;

        $query = $grupo->get();

        return view('admin_manage_groups', ['grupos'=> $query]);
    }

    public function verGrupos(){
        if(!Auth::check()){
            return view('index');
        }
        if(Superadministrador::where('idUsuario', Auth::id())->count() == 0){
            return view('user_watch_dashboard', ['idUsuario' => Auth::id(), 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);
        }
    	   return view('admin_manage_groups_list', ['nombreVista'=> 'Grupos', 'iconoVista' => 'computer']);
    }

    public function agregarGrupo(){
        if(!Auth::check()){
            return view('index');
        }
        if(Superadministrador::where('idUsuario', Auth::id())->count() == 0){
            return view('user_watch_dashboard', ['idUsuario' => Auth::id(), 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);
        }
    	   return view('admin_create_group', ['nombreVista'=> 'Nuevo Grupo', 'iconoVista' => 'group']);
    }

    public function obtenerLiderTabla(){
        if(!Auth::check()){
            return view('index');
        }

    	$usuario = new User;
    	$query = $usuario->whereIn('idUsuario', request("usuarios"))->get();

    	return view('tabla_lider',['usuarios' => $query]);
    }

    public function agregarGrupoBD(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inica sesion para continuar'
            ]);
        }
        if(Superadministrador::where('idUsuario', Auth::id())->count() == 0){
            return response()->json([
                  'status' => 'ERROR',
                  'result' => 'Inicia sesion como administrador para continuar'
            ]);
        }
        $cont = Grupo::where('nombreGrupo', '=', request('nombreGrupo'))->count();

        if($cont > 0){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Ya existe un grupo con el mismo nombre'
            ]);
        }
        $integrantes = request("integrantes");
        $flag = false;
        foreach ($integrantes as $value) {
            if($value == request('lider')){
                $flag = true;
                break;
            }
        }
        if($flag == false){
            return response()->json([
                  'status' => 'ERROR',
                  'result' => 'El nuevo lider debe pertenecer al grupo'
            ]);
        }
        $grupo = new Grupo;
      	$grupo->nombreGrupo = request("nombreGrupo");
      	$grupo->descripcion = request("descripcion");
        $grupo->save();

        $administrarGrupo = new AdministradorGrupo;
        $administrarGrupo->idUsuario = request("lider");
        $administrarGrupo->idGrupo = $grupo->idGrupo;

        $administrarGrupo->save();



        foreach ($integrantes as $value) {
            $usuarioGrupo = new UsuarioGrupo;
            $usuarioGrupo->idUsuario = $value;
            $usuarioGrupo->idGrupo = $grupo->idGrupo;
            $usuarioGrupo->save();
        }



    	return response()->json([
            'status' => 'OK',
            'result' => 'Grupo creado correctamente'
      ]);
    }
    public function agregarUsuario(){
        if(!Auth::check()){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Inicia Sesion para continuar'
                ]);
        }

        $idGrupo = request("idGrupo");

        $liderGrupo = AdministradorGrupo::where('idGrupo', $idGrupo )->first();
        if(Auth::id() != $liderGrupo->idUsuario){
          return response()->json([
              'status'=> 'ERROR',
              'result'=> 'Inicia sesion como administrador de grupo para continuar'
              ]);
        }

    	$integrantes = request("integrantes");

    	try{
    		foreach ($integrantes as $value) {
	            try{
                    UsuarioGrupo::where([['idGrupo', '=', $idGrupo],['idUsuario', '=', $value] ])->firstOrFail();

                    UsuarioGrupo::where([['idGrupo', '=', $idGrupo],['idUsuario', '=', $value] ])->update(['estado'=> 1]);
                }catch(ModelNotFoundException $e){
                    $usuarioGrupo = new UsuarioGrupo;
                    $usuarioGrupo->idUsuario = $value;
                    $usuarioGrupo->idGrupo = $idGrupo;
                    $usuarioGrupo->save();
                }


        	}

	    	return response()->json([
	                'status'=> 'OK',
                    'result'=> 'Usuario(s) Agregado(s)'
	                ]);
    	}catch(ModelNotFoundException $e){
    		return response()->json([
    			'status'=> 'ERROR',
    			'result'=> 'Error al agregar usuario(s)'
    		]);
    	}

    }
    public function editarGrupo(){
        if(!Auth::check()){
            return view('index');
        }
        try{
          $liderGrupo = AdministradorGrupo::where('idGrupo', request('idGrupo') )->first();
        	$grupo = Grupo::findOrFail(request('idGrupo'));
          if($liderGrupo->idUsuario != Auth::id() && Superadministrador::where('idUsuario', Auth::id())->count() == 0){
              return response()->json([
                    'status' => 'ERROR',
                    'result' => 'No tienes permiso para editar'
              ]);
          }
          $integrantes = UsuarioGrupo::where([['idGrupo', '=', request('idGrupo')], ['estado', '=', 1]])->get();
          $flag = false;
          foreach ($integrantes as $value) {
              if($value->idUsuario == request('idUsuario')){
                  $flag = true;
                  break;
              }
          }
          if($flag == false){
              return response()->json([
                    'status' => 'ERROR',
                    'result' => 'El nuevo lider debe pertenecer al grupo'
              ]);
          }

       	 	$grupo->descripcion = request('descripcion');
        	$grupo->nombreGrupo = request('nombre');
          $grupo->save();
        	$adminGrupo = AdministradorGrupo::where('idGrupo', '=', $grupo->idGrupo)->update(['idUsuario' => request('idUsuario')]);


        	return response()->json([
                'status'=> 'OK',
                'result' => 'Informacion actualizada'
                ]);
        }catch(ModelNotFoundException $e){
        	return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Grupo no existe'
                ]);
        }

    }

    public function obtenerGrupo(){
        if(!Auth::check()){
            return view('index');
        }
        $pertenece = UsuarioGrupo::where([['idUsuario', '=', Auth::id()],['idGrupo', '=', request('idGrupo')]])->where('estado', 1)->count();
        if($pertenece == 0 && Superadministrador::where('idUsuario', Auth::id())->count() == 0){
            return response()->json([
                  'status' =>'ERROR',
                  'result' => 'No tienes permiso para ver este grupo'
            ]);
        }
        $grupo = new Grupo;
        $lider = new AdministradorGrupo;

        $info = $grupo->where([['idGrupo', '=', request('idGrupo')]])->get();
        $query = $lider->where([['idGrupo', '=', request('idGrupo')]])->get();
        //$info->tesla = $query[0]->idUsuario;
        //$nueva->tesla = $query[0]->idUsuario;;
        return response()->json([
                'status'=> 'OK',
                'result'=> array(
                	'grupo'=>$info[0],
                	'lider'=>$query[0]->idUsuario,
                  'permiso' => $query[0]->idUsuario == Auth::id() || Superadministrador::where('idUsuario', Auth::id())->count() == 1
                )
                ]);
    }

    public function eliminarGrupo(){
        if(!Auth::check()){
            return view('index');
        }

        if(Superadministrador::where('idUsuario', Auth::id())->count() == 0){
            return response()->json([
                  'status' => 'ERROR',
                  'result' => 'Inicia sesion como administrador para continuar'
            ]);
        }
        try{
            $grupo = Grupo::findOrFail(request('idGrupo'));
            $grupo->estado = 3;
            $grupo->save();

            return response()->json([
                'status'=> 'OK',
                'result'=> 'El grupo ha sido eliminado'
                ]);
        }catch(ModelNotFoundException $ex){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Grupo no existe'
                ]);
        }
    }

    public function obtenerUsuariosGrupoTabla(){
        if(!Auth::check()){
            return view('index');
        }

        $usuarioGrupo = new UsuarioGrupo;
        $usuario = new User;
        $query = $usuarioGrupo->where([['idGrupo', '=', request('idGrupo')], ['estado', '=', 1]])->get();
        $arrays = array();
        foreach ($query as $value) {
            array_push($arrays, $value->idUsuario);
        }

        $result = $usuario->whereIn('idUsuario', $arrays)->get();
        return view('tabla_grupo',  ['usuarios'=> $result]);
    }
    public function obtenerUsuariosGrupo(){
        if(!Auth::check()){
            return response()->json([
            'status'=>'ERROR',
            'result'=> 'Inicia Sesion'
             ]);
        }
        $pertenece = UsuarioGrupo::where([['idUsuario', '=', Auth::id()],['idGrupo', '=', request('idGrupo')]])->where('estado', 1)->count();
        if($pertenece == 0 && Superadministrador::where('idUsuario', Auth::id())->count() == 0){
            return response()->json([
                  'status' =>'ERROR',
                  'result' => 'No tienes permiso para ver este grupo'
            ]);
        }

        $usuarioGrupo = new UsuarioGrupo;
        $usuario = new User;
        $query = $usuarioGrupo->where([['idGrupo', '=', request('idGrupo')], ['estado', '=', 1]])->get();
        $arrays = array();
        foreach ($query as $value) {
            array_push($arrays, $value->idUsuario);
        }

        $result = $usuario->whereIn('idUsuario', $arrays)->get();
        return response()->json([
            'status'=>'OK',
            'result'=> $result
        ]);
    }
    public function obtenerIdUsuariosGrupo(){
        if(!Auth::check()){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Inicia sesion para continuar'
                ]);
        }
        $pertenece = UsuarioGrupo::where([['idUsuario', '=', Auth::id()],['idGrupo', '=',request('idGrupo')]])->where('estado', 1)->count();
        if($pertenece == 0 && Superadministrador::where('idUsuario', Auth::id())->count() == 0){
            return response()->json([
                  'status' =>'ERROR',
                  'result' => 'No tienes permiso para ver este grupo'
            ]);
        }
        $usuarioGrupo = new UsuarioGrupo;
        $usuario = new User;
        $query = $usuarioGrupo->where([['idGrupo', '=', request('idGrupo')], ['estado', '=', 1]])->get();
        $arrays = array();

        foreach ($query as $value) {
            array_push($arrays, $value->idUsuario);
        }
        return response()->json([
                'status'=> 'OK',
                'result'=> $arrays
                ]);

    }
    public function obtenerGrupos(){
        if(!Auth::check()){
            return view('index');
        }

        $grupo = new Grupo;

        return $grupo->where('estado', '!=', 3)->get();
    }
    public function verGrupo($idGrupo){
    	if(!Auth::check()){
            return view('index');
        }
        $pertenece = UsuarioGrupo::where([['idUsuario', '=', Auth::id()],['idGrupo', '=', $idGrupo]])->where('estado', 1)->count();
        $existe = Grupo::where([['idGrupo', $idGrupo],['estado', 1]])->count();
        if($existe && ($pertenece || Superadministrador::where('idUsuario', Auth::id())->count() > 0))
          return view('admin_watch_group', ['idGrupo' => $idGrupo,'nombreVista'=> 'Grupos', 'iconoVista' => 'computer']);

        if(Superadministrador::where('idUsuario', Auth::id())->count() == 0)
          return view('user_watch_dashboard', ['idUsuario' => Auth::id(), 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);

        return view('admin_index', [ 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);
    }
    public function obtenerProyectosGrupo(){
        if(!Auth::check()){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Inicia sesion para continuar'
                ]);;
        }
        $pertenece = UsuarioGrupo::where([['idUsuario', '=', Auth::id()],['idGrupo', '=', request('idGrupo')]])->where('estado', 1)->count();
        $existe = Grupo::where([['idGrupo', request('idGrupo')],['estado', 1]])->count();
        if($existe == 0 || ($pertenece == 0 && Superadministrador::where('idUsuario', Auth::id())->count() == 0)){
            return response()->json([
                  'status' =>'ERROR',
                  'result' => 'No tienes permiso para ver este grupo'
            ]);
        }
        $proyectoGrupo = new ProyectoGrupo;
        $usuario = new User;
        $proyecto = new Proyecto;
        $query = $proyectoGrupo->where('idGrupo', '=', request('idGrupo'))->get();
        $arrays = array();

        foreach ($query as $value) {
            array_push($arrays, $value->idProyecto);
        }

        $adminProyecto = new AdministradorProyecto;
        $queryProyecto = $proyecto->whereIn('idProyecto',$arrays)->get();

        $respuesta = array();

        foreach($queryProyecto as $proyecto){
            if($proyecto->estado == 3) continue;

        	$idLider =$adminProyecto->where('idProyecto', '=', $proyecto->idProyecto)->get();
        	$usuarioP = $usuario->where('idUsuario', '=', $idLider[0]->idUsuario)->get();

            array_push($respuesta, ['proyecto'=>$proyecto, 'lider'=> $usuarioP[0]]);
        }
        return response()->json([
                'status'=> 'OK',
                'result'=> $respuesta
                ]);

    }
    public function agregarProyecto($idGrupo){
        if(!Auth::check()){
            return view('index');
        }
          $liderGrupo = AdministradorGrupo::where('idGrupo', request('idGrupo') )->first();
          $super = Superadministrador::where('idUsuario', Auth::id())->count();
          $existe = Grupo::where([['idGrupo', $idGrupo],['estado', 1]])->count();
        if($existe && ($liderGrupo->idUsuario == Auth::id() || $super)){
            return view('groupAdmin_create_project',['idGrupo' => $idGrupo, 'nombreVista' => 'Nuevo Proyecto', 'iconoVista' => 'assignment']);

        }
        if($super == 0)
          return view('user_watch_dashboard', ['idUsuario' => Auth::id(), 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);
        return view('admin_index', [ 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);
    }
    public function permisosGrupo(){
            if(!Auth::check()){
                return response()->json([
                    'status' => 'ERROR',
                    'result' => 'Inicia sesion para continuar'
                ]);
            }
            $liderGrupo = AdministradorGrupo::where('idGrupo', request('idGrupo') )->first();
            return response()->json([
                'status' => 'OK',
                'result' => array('eliminar' => $liderGrupo->idUsuario == Auth::id(),
                'editar' => $liderGrupo->idUsuario == Auth::id()
              )
            ]);
    }
}
