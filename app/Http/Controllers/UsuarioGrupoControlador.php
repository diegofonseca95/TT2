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
class UsuarioGrupoControlador extends Controller
{
    public function obtenerInformacion(){
    	$usuarioGrupo = new UsuarioGrupo;
    	$grupo = new Grupo;
    	$query = $usuarioGrupo->where('idUsuario', '=', request('idUsuario'))->get();

    	$grupos = array();
    	foreach($query as $value){
    		array_push($grupos, 
    			$this->obtenerInformacionGrupo($value->idGrupo));
    	}

    	return response()->json([
                'status'=> 'OK',
                'result'=>$grupos
                ]);

    }

    public function obtenerInformacionGrupo($idGrupo){

        $grupo = new Grupo;
        $lider = new AdministradorGrupo;
        $usuario = new User;

        $info = $grupo->where([['idGrupo', '=', $idGrupo]])->get();
        $query = $lider->where([['idGrupo', '=', $idGrupo]])->get();
        $liderInfo = $usuario->where('idUsuario', '=', $query[0]->idUsuario)->get();
        //$info->tesla = $query[0]->idUsuario;
        //$nueva->tesla = $query[0]->idUsuario;;
        return array(
                	'grupo'=>$info[0],
                	'lider'=>$liderInfo[0]
               );
    }

    public function eliminarUsuarioGrupo(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }
        try{
            $usuarioGrupo = new UsuarioGrupo;
            $adminGrupo = new AdministradorGrupo;
            $usuario = new User;

            $query = $adminGrupo->where('idGrupo', '=', request('idGrupo'))->get();

            if($query[0]->idUsuario == request('idUsuario')){
                return response()->json([
                    'status' => 'ERROR',
                    'result' => 'No puedes eliminar al lider del grupo'
                ]);
            }

            $userGroup = $usuarioGrupo->where([['idGrupo', '=', request('idGrupo')], ['idUsuario', '=', request('idUsuario')]])->update(['estado'=> 3]);
            return response()->json([
                'status' => 'OK',
                'result' => 'Usuario Eliminado'
            ]);
        }catch(Exception $e){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Usuario no pertenece al grupo'
            ]);
        }
        

    }
    
}
