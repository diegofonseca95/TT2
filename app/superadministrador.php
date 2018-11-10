<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Superadministrador extends Model
{
    public $timestamps = false;
    protected $table = 'superadministrador';
    protected $primaryKey = 'idAdministrador';
}
