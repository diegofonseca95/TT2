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
use App\UsuarioConversacion;
use Illuminate\Support\Facades\Crypt;
use Carbon\Carbon;

class Chat implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $idChat;
    public $user;
    public $message;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($idChat, $user, $message)
    {

        $encriptado = Crypt::encrypt($message);
        $this->idChat = $idChat;
        $this->user = $user;
        $usuarioConversacion = UsuarioConversacion::where([['idConversacion', $idChat],['idUsuario', $user]])->first();
        $temp = new Mensaje;
        $temp->idUsuarioConversacion = $usuarioConversacion->idUsuarioConversacion;
        $temp->contenido = $encriptado;
        $temp->save();
        $mytime = Carbon::now();
        $this->message = (object) [
          'idMensaje' => $temp->idMensaje,
          'contenido' => $message,
          'idUsuarioConversacion' => $temp->idUsuarioConversacion,
          'fecha' => $mytime->toDateTimeString(),
          ];
        //$this->message->contenido = decrypt($this->message->contenido);

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {

        return new PrivateChannel('chat.'.$this->idChat);
        //return ['chat.'.$val.'.'.$val1];
    }

}
