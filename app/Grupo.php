<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
	public $timestamps = false;
    protected $table = 'grupo';
    protected $primaryKey = 'idGrupo';
    
}
