<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;
class UsuariosControlador extends Controller
{
    public function agregarUsuario(){
        
    	return view('registro');
    }

    public function index(){
        if(Auth::check()) return view('index_admin');
    	return view('index');
    }

    public function administrarUsuarios(){
        return view('admin_users');
    }
    public function agregarUsuarioBD(){
        if(!Auth::check()){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Inicia sesion para continuar'
                ]);
        }
    	$usuario = new User;
        $query = $usuario->where([['correo', '=', request('correo')]])->get();

        if($query->isNotEmpty() ){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Ya existe una cuenta con ese correo'
                ]);
        }


    	$usuario->nombre = request('nombre');
    	$usuario->apellidoPaterno = request('apellidoPaterno');
    	$usuario->apellidoMaterno = request('apellidoMaterno');
    	$usuario->correo = request('correo');
    	$usuario->contrasena = request('contrasena');
    	$usuario->telefono = request('telefono');

    	$usuario->save();

    	return response()->json([
                'status'=> 'OK',
                'result'=> 'El usuario ha sido registrado',
                'redirect'=> '/'
                ]);
    }

    public function obtenerUsuario(){
        if(!Auth::check()){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Inicia sesion para continuar'
                ]);
        }

        $usuario = new User;
        $query = $usuario->where([['idUsuario','=', request('idUsuario')]]);

        return $query;
    }

    public function obtenerUsuarios(){
        if(!Auth::check()){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Inicia sesion para continuar'
                ]);
        }
        
        $usuario = new User;
        
        return $usuario->where('estado', '!=', 3)->get();
    }

    public function validarUsuario(){
        $usuario = User::find(request('idUsuario'));

        if($usuario->estado == 2){
            $usuario->estado = 1;
            $usuario->save();
            return response()->json([
                'status'=> 'OK',
                'result'=> 'El usuario se ha validado con éxito'
                ]);
        }
        
        else if($usuario->estado == 1){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'El usuario ya había sido validado'
                ]);
        }
        else return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Usuario no existe'
                ]);
    }

    public function eliminarUsuario(){
        try{
            $usuario = User::findOrFail(request('idUsuario'));
            $usuario->estado = 3;
            $usuario->save();

            return response()->json([
                'status'=> 'OK',
                'result'=> 'El usuario ha sido eliminado'
                ]);
        }catch(Exception $ex){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Usuario no existe'
                ]);
        }
    }

}
