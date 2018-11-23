<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NuevoMensaje implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $idConversacion;
    public $user;
    public $tipo;
    public $conversacion;
    public $integrantes;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($idConversacion, $user, $tipo, $conversacion, $integrantes)
    {

        $this->user = $user;
        $this->idConversacion = $idConversacion;
        $this->tipo = $tipo;
        $this->conversacion = $conversacion;
        $this->integrantes = $integrantes;



    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('nuevo.'.$this->user);
    }
}
