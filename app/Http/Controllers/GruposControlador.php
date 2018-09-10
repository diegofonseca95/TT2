<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Usuario;
use App\Grupo;
use App\AdministradorGrupo;
use App\UsuarioGrupo;

class GruposControlador extends Controller
{
    public function administrarGrupos(){

        $grupo = new Grupo;

        $query = $grupo->get();

        return view('admin_manage_groups', ['grupos'=> $query]);
    }

    public function verGrupos(){

    	return view('admin_manage_groups_list');
    }

    public function agregarGrupo(){

    	$usuario = new Usuario;
    	$query = $usuario->where('estado', '!=', 0)->get();

    	return view('admin_create_groups', [ 'usuarios' => $query]);
    }

    public function obtenerLiderTabla(){
    	$usuario = new Usuario;
    	$query = $usuario->whereIn('idUsuario', request("usuarios"))->get();

    	return view('tabla_lider',['usuarios' => $query]);
    }

    public function agregarGrupoBD(){

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
        $grupo = new Grupo;

        $query = $grupo->where('idGrupo', '=', $idGrupo)->get();

        return view("admin_manage_groups", ['grupo' => $query[0]]);
    }

    public function obtenerGrupo(){
        $grupo = new Grupo;

        $query = $grupo->where('idGrupo', '=', request('idGrupo'))->get();

        return $query;
    }

    public function eliminarGrupo(){
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
        $usuarioGrupo = new UsuarioGrupo;
        $usuario = new Usuario;
        $query = $usuarioGrupo->where('idGrupo', '=', request('idGrupo'))->get();
        $arrays = array();
        foreach ($query as $value) {
            array_push($arrays, $value->idUsuario);
        }

        $result = $usuario->whereIn('idUsuario', $arrays)->get();
        return view('tabla_grupo',  ['usuarios'=> $result]);
    }

    public function obtenerGrupos(){
        $grupo = new Grupo;
        
        return $grupo->where('estado', '!=', 3)->get();
    }
}
