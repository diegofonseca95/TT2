<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProyectoGrupo extends Model
{
	public $timestamps = false;
    protected $table = 'proyectogrupo';
    protected $primaryKey = 'idProyectoGrupo';
    
}