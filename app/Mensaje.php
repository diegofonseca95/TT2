<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
	  public $timestamps = false;
    protected $table = 'mensaje';
    protected $primaryKey = 'idMensaje';

}
