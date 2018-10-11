<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Grupo;
use App\AdministradorGrupo;
use App\AdministradorProyecto;
use App\ProyectoGrupo;
use App\Proyecto;
use Auth;
class ProyectoGrupoControlador extends Controller
{
    
    public function eliminarProyectoGrupo(){
        if(!Auth::check()){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Inicia sesion para continuar'
            ]);
        }
        try{
           
            Proyecto::where('idProyecto', '=', request('idProyecto'))->update(['estado' => 3]);

            
            return response()->json([
                'status' => 'OK',
                'result' => 'Proyecto Eliminado'
            ]);
        }catch(Exception $e){
            return response()->json([
                'status' => 'ERROR',
                'result' => 'Proyecto no existe'
            ]);
        }
        

    }
    
}
