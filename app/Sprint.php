<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sprint extends Model
{
	public $timestamps = false;
    protected $table = 'sprint';
    protected $primaryKey = 'idSprint';
    
}
