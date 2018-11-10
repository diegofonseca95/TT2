<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Conversacion extends Model
{
    public $timestamps = false;
    protected $table = 'conversacion';
    protected $primaryKey = 'idConversacion';
}
