<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Mail\RecuperarContrasena;
use Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Superadministrador;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Crypt;
class SesionControlador extends Controller
{
    public function iniciarSesion(){


    	$usuario = new User;

        $query = $usuario->where('correo',request('correo'))->get();

        if($query->isNotEmpty() && $query[0]->estado == 1 && Crypt::decrypt($query[0]->contrasena)== request('contrasena')){


            session(['usuario.nombre' => $query[0]->nombre]);
            session(['usuario.idUsuario' => $query[0]->idUsuario]);

            if(Auth::check() && Auth::id() != $query[0]->idUsuario){
                  Auth::logout();
            }
            if(!Auth::check())
              Auth::login($query[0]);

            return response()->json([
                'status'=> 'OK',
                'result'=> '/iniciarSesionAdmin'
                ]);
        }else if($query->isNotEmpty() && $query[0]->estado == 2 && Crypt::decrypt($query[0]->contrasena)== request('contrasena')){
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
        $query = $usuario->where([['correo', '=', request('userId')],['estado', '!=', 3]])->get();

        if(!$query->isNotEmpty()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Correo no registrado'
            ]);
        }
        try{
            $usuario = User::findOrFail($query[0]->idUsuario);
            $usuario->contrasena = substr(md5($usuario->nombre.$usuario->contrasena), 0, 10);

            \Mail::to(request('userId'))->send(new RecuperarContrasena($usuario));

            $usuario->save();

            return response()->json([
                'status' => 'OK',
                'result' => 'Se ha enviado un correo con los pasos a seguir para recuperar tu contraseña'
            ]);

        }catch(ModelNotFoundException $ex){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Usuario no existe'
            ]);
        }


    }

    public function iniciarSesionAdmin(){
        if(Auth::check() ){
            if(Superadministrador::where('idUsuario', Auth::id())->count() == 0){
                return view('user_watch_dashboard', ['idUsuario' => Auth::id(), 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);
            }
            return view('admin_index', [ 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);
        }


        return view('index');
    }

    public function cerrarSesion(){
        Auth::logout();
        return view('index');
    }
    public function cerrarSesionBlog(){
        Auth::logout();
        return back();
    }
    public function testChat(){
        $user = Auth::id();
        return view('user_watch_dashboard', ['idUsuario' => $user, 'nombreVista' => 'Principal', 'iconoVista' => 'contacts']);
    }
    public function test(){
       return view('TestChat');
    }

}
