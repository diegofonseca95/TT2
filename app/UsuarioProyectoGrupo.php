<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsuarioProyectoGrupo extends Model
{
	public $timestamps = false;
    protected $table = 'usuarioproyectogrupo';
    protected $primaryKey = 'idUsuarioProyectoGrupo';
    
}