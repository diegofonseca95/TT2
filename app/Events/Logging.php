<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use App\User;
use App\Proyecto;
use App\Actividad;
use Carbon\Carbon;

class Logging implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $actividad;
    public $idProyecto;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($idProyecto, $user, $message)
    {
        $this->idProyecto = $idProyecto;
        $usuario = User::where('idUsuario', $user)->first();
        $temp = new Actividad;
        $temp->idProyecto = $idProyecto;
        $mytime = Carbon::now();
        $temp->fecha = $mytime->toDateTimeString();

        $temp->mensaje = $usuario->nombre.' '. $usuario->apellidoPaterno.' '.$message;
        $temp->save();

        $this->actividad = $temp;




    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {

        return new PrivateChannel('log.'.$this->idProyecto);
        //return ['chat.'.$val.'.'.$val1];
    }

}
