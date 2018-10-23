<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class TareaProyectoGrupo extends Authenticatable
{
    use Notifiable;
    public $timestamps = false;
    protected $table = 'tareaproyectogrupo';
    protected $primaryKey = 'idTareaProyectoGrupo';

}
