<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Mail\RecuperarContrasena;
use Auth;
class SesionControlador extends Controller
{
    public function iniciarSesion(){

    	$usuario = new User;

        $query = $usuario->where([['correo', '=', request('correo')],['contrasena', '=', request('contrasena')]])->get();

        if($query->isNotEmpty() && $query[0]->estado == 1){

            
            session(['usuario.nombre' => $query[0]->nombre]);
            session(['usuario.idUsuario' => $query[0]->idUsuario]);
            
            Auth::login($query[0]);

            return response()->json([
                'status'=> 'OK',
                'result'=> '/iniciarSesionAdmin'
                ]);
        }else if($query->isNotEmpty() && $query[0]->estado == 2){
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Usuario no validado. Pongase en contacto con el administrador'
                ]);
        }else{
            return response()->json([
                'status'=> 'ERROR',
                'result'=> 'Correo ó contraseña incorrecto'
                ]);
        }
    }

    public function recuperarContrasena(){

        $usuario = new User;
        $query = $usuario->where([['correo', '=', request('userId')],['estado', '!=', 0]])->get();

        if(!$query->isNotEmpty()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Correo no registrado'
            ]);
        }
        try{
            $usuario = User::find($query[0]->idUsuario);
            $usuario->contrasena = substr(md5($usuario->nombre.$usuario->contrasena), 0, 10);

            \Mail::to(request('userId'))->send(new RecuperarContrasena($usuario));
            
            $usuario->save();

            return response()->json([
                'status' => 'OK',
                'result' => 'Se ha enviado un correo con los pasos a seguir para recuperar tu contraseña'
            ]);

        }catch(Exception $ex){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Error desconocido'
            ]);
        }
        

    }

    public function iniciarSesionAdmin(){
        if(Auth::check())
        return view('index_admin');

        return view('index');
    }

    public function cerrarSesion(){
        Auth::logout(); 
        return view('index');
    }
}
