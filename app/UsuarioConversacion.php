<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsuarioConversacion extends Model
{
      public $timestamps = false;
      protected $table = 'usuarioconversacion';
      protected $primaryKey = 'idUsuarioConversacion';
}
