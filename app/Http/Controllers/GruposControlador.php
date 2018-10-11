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
class GruposControlador extends Controller
{
    public function administrarGrupos(){
        if(!Auth::check()){
            return view('index');
        }

        $grupo = new Grupo;

        $query = $grupo->get();

        return view('admin_manage_groups', ['grupos'=> $query]);
    }

    public function verGrupos(){
        if(!Auth::check()){
            return view('index');
        }

    	return view('admin_manage_groups_list', ['nombreVista'=> 'Grupos', 'iconoVista' => 'computer']);
    }

    public function agregarGrupo(){
        if(!Auth::check()){
            return view('index');
        }

    	$usuario = new User;
    	$query = $usuario->where('estado', '!=', 0)->get();

    	return view('admin_create_groups', [ 'usuarios' => $query]);
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
            return view('index');
        }

        $grupo = new Grupo;
    	$grupo->nombreGrupo = request("nombreGrupo");
    	$grupo->descripcion = request("descripcion");
        $grupo->save();

        $administrarGrupo = new AdministradorGrupo;
        $administrarGrupo->idUsuario = request("lider");
        $administrarGrupo->idGrupo = $grupo->idGrupo;

        $administrarGrupo->save();

    	$integrantes = request("integrantes");

        foreach ($integrantes as $value) {
            $usuarioGrupo = new UsuarioGrupo;
            $usuarioGrupo->idUsuario = $value;
            $usuarioGrupo->idGrupo = $grupo->idGrupo;
            $usuarioGrupo->save();
        }

    	
    	
    	return view("welcome");
    }
    public function agregarUsuario(){
        if(!Auth::check()){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Inicia Sesion para continuar'
                ]);
        }

        $idGrupo = request("idGrupo");
   

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
    	}catch(Exception $e){
    		return response()->json([
    			'status'=> 'ERROR',
    			'result'=> $e
    		]);
    	}
        
    }
    public function editarGrupo(){
        if(!Auth::check()){
            return view('index');
        }
        try{
        	$grupo = Grupo::findOrFail(request('idGrupo'));
       	 	$grupo->descripcion = request('descripcion');
        	$grupo->nombreGrupo = request('nombre');
            $grupo->save();
        	$adminGrupo = AdministradorGrupo::where('idGrupo', '=', $grupo->idGrupo)->update(['idUsuario' => request('idUsuario')]);


        	return response()->json([
                'status'=> 'OK',
                ]);
        }catch(Exception $e){
        	return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Grupo no existe'
                ]);
        }
        
        

        $lider = request('lider');
        $query = $grupo->where('idGrupo', '=', $idGrupo)->get();

        return view("admin_manage_groups", ['grupo' => $query[0]]);
    }

    public function obtenerGrupo(){
        if(!Auth::check()){
            return view('index');
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
                	'lider'=>$query[0]->idUsuario
                )
                ]);
    }

    public function eliminarGrupo(){
        if(!Auth::check()){
            return view('index');
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
                'result'=> 'No tienes acceso a esta vista :('
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

        return view('admin_watch_group', ['idGrupo' => $idGrupo,'nombreVista'=> 'Grupos', 'iconoVista' => 'computer']);
    }
    public function obtenerProyectosGrupo(){
        if(!Auth::check()){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'No tienes acceso a esta vista :('
                ]);;
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

        return view('groupAdmin_create_project',['idGrupo' => $idGrupo, 'nombreVista' => 'Proyectos', 'iconoVista' => 'assignment']);
    }
}
