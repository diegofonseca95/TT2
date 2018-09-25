<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Grupo;
use App\AdministradorGrupo;
use App\UsuarioGrupo;
use Auth;

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

    public function editarGrupo($idGrupo){
        if(!Auth::check()){
            return view('index');
        }

        $grupo = new Grupo;

        $query = $grupo->where('idGrupo', '=', $idGrupo)->get();

        return view("admin_manage_groups", ['grupo' => $query[0]]);
    }

    public function obtenerGrupo(){
        if(!Auth::check()){
            return view('index');
        }

        $grupo = new Grupo;

        $query = $grupo->where('idGrupo', '=', request('idGrupo'))->get();

        return $query;
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
        }catch(Exception $ex){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Grupo no existe'
                ]);
        }
    }

    public function obtenerUsuariosGrupo(){
        if(!Auth::check()){
            return view('index');
        }

        $usuarioGrupo = new UsuarioGrupo;
        $usuario = new User;
        $query = $usuarioGrupo->where('idGrupo', '=', request('idGrupo'))->get();
        $arrays = array();
        foreach ($query as $value) {
            array_push($arrays, $value->idUsuario);
        }

        $result = $usuario->whereIn('idUsuario', $arrays)->get();
        return view('tabla_grupo',  ['usuarios'=> $result]);
    }
    public function obtenerIdUsuariosGrupo(){
        if(!Auth::check()){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'No tienes acceso a esta vista :('
                ]);;
        }

        $usuarioGrupo = new UsuarioGrupo;
        $usuario = new User;
        $query = $usuarioGrupo->where('idGrupo', '=', request('idGrupo'))->get();
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
}
