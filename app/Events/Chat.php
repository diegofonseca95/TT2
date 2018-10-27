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
use App\Mensaje;

class Chat implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $user2;

    public $message;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user, $user2, $message)
    {
        $this->user = User::findOrNew($user);
        $this->user2 = $user2;

        $temp = new Mensaje;
        $temp->idEmisor = $user;
        $temp->idReceptor = $user2;
        $temp->contenido = $message;
        $temp->save();

        $this->message = $temp;

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        $val = $this->user->idUsuario;
        $val1 = $this->user2;
        if($val > $val1) $this->swap($val, $val1);

        return new PrivateChannel('chat.'.$val.'.'.$val1);
        //return ['chat'];
    }
    function swap(&$x,&$y) {
    $tmp=$x;
    $x=$y;
    $y=$tmp;
}

}
