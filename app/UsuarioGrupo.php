<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsuarioGrupo extends Model
{
    public $timestamps = false;
    protected $table = 'usuariogrupo';
    //protected $primaryKey = ['idUsuario', 'idGrupo'];
}
