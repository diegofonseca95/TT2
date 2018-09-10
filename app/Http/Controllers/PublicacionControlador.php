<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Publicacion;

class PublicacionControlador extends Controller
{
    //
    /*public function publicacionesGrupo($idGrupo){
   		$publicacion = new Publicacion;
   		$query = $publicacion->where('idGrupo', '=', $idGrupo)->get();
   		return view('publicaciones_grupo',['publicaciones' => $query]);
    }*/
    public function publicacionesGrupo(){
   		$publicacion = new Publicacion;
   		$query = $publicacion->all();
   		return view('publicaciones_grupo', ['publicaciones' => $query]);
    }
}
