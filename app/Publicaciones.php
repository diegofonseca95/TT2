<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Publicaciones extends Model
{
  public $timestamps = false;
  protected $table = 'publicacion';
  protected $primaryKey = 'idPublicacion';
}
