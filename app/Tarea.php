<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

	class Tarea extends Model
{
	public $timestamps = false;
    protected $table = 'tarea';
    protected $primaryKey = 'idTarea';

}
