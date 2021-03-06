<?php

/*
|-------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', 'UsuariosControlador@index');
Route::post('/obtenerIdUsuario', 'UsuariosControlador@obtenerIdUsuario');
Route::post('/obtenerTodosUsuarios', 'UsuariosControlador@obtenerTodosUsuarios');
Route::post('/nuevaConversacion', 'ChatControlador@nuevaConversacion');
Route::get('/agregarUsuario', 'UsuariosControlador@agregarUsuario');
Route::post('/agregarUsuario', 'UsuariosControlador@agregarUsuarioBD');
Route::post('/obtenerUsuario', 'UsuariosControlador@obtenerUsuario');
Route::post('/iniciarSesion', 'SesionControlador@iniciarSesion');
Route::get('/administrarUsuarios','UsuariosControlador@administrarUsuarios');
Route::get('/administrarProyectos','ProyectosControlador@administrarProyectos');
Route::get('/administrarGrupos', 'GruposControlador@verGrupos');
Route::get('/administrarBlogs', 'PublicacionControlador@administrarBlogs');
Route::get('/administrarArchivos', 'ArchivosControlador@administrarArchivos');
Route::get('/verGrupos', 'GruposControlador@verGrupos');
Route::get('/agregarGrupo', 'GruposControlador@agregarGrupo');
Route::post('/obtenerLiderTabla', 'GruposControlador@obtenerLiderTabla');
Route::post('/agregarGrupo', 'GruposControlador@agregarGrupoBD');
Route::post('/obtenerUsuarios', 'UsuariosControlador@obtenerUsuarios');
Route::post('/obtenerUsuariosActivos', 'UsuariosControlador@obtenerUsuariosActivos');
Route::post('/eliminarUsuario', 'UsuariosControlador@eliminarUsuario');
Route::post('/validarUsuario', 'UsuariosControlador@validarUsuario');
Route::post('/obtenerGrupos', 'GruposControlador@obtenerGrupos');
Route::post('/obtenerGrupo', 'GruposControlador@obtenerGrupo');
Route::post('/eliminarGrupo', 'GruposControlador@eliminarGrupo');
Route::post('/obtenerUsuariosGrupo', 'GruposControlador@obtenerUsuariosGrupo');
//Route::get('/recuperarContrasena?userId={userId}', 'SesionControlador@recuperarContrasena');
Route::post('/editarGrupo', 'GruposControlador@editarGrupo');
Route::get('/verGrupo/{idGrupo}', 'GruposControlador@verGrupo');
//Route::get('/publicacionesGrupo/{idGrupo}', 'PublicacionControlador@publicacionesGrupo');
Route::get('/publicacionesGrupo/{idGrupo}', 'PublicacionControlador@publicacionesGrupo');
Route::post('/recuperarContrasena', 'SesionControlador@recuperarContrasena');
Route::get('/iniciarSesionAdmin', 'SesionControlador@iniciarSesionAdmin');
Route::post('/obtenerIdUsuariosGrupo','GruposControlador@obtenerIdUsuariosGrupo');
Route::post('/agregarUsuariosGrupo', 'GruposControlador@agregarUsuario');
Route::post('/obtenerGruposUsuario', 'UsuarioGrupoControlador@obtenerInformacion');
Route::post('/obtenerProyectosUsuario', 'UsuarioProyectoGrupoControlador@obtenerInformacion');
Route::get('/agregarProyecto/{idGrupo}', 'GruposControlador@agregarProyecto');
Route::post('/agregarProyecto', 'ProyectosControlador@agregarProyectoBD');
Route::post('/obtenerProyectosGrupo', 'GruposControlador@obtenerProyectosGrupo');
Route::get('/verProyecto/{idProyecto}', 'ProyectosControlador@verProyecto');
Route::get('/verSprint/{idSprint}', 'SprintControlador@verSprint');
Route::post('/eliminarUsuarioGrupo', 'UsuarioGrupoControlador@eliminarUsuarioGrupo');
Route::post('/eliminarProyecto', 'ProyectoGrupoControlador@eliminarProyectoGrupo');
Route::post('/obtenerIdUsuariosProyecto', 'ProyectosControlador@obtenerUsuariosProyecto');
Route::post('/agregarUsuariosProyecto', 'UsuarioProyectoGrupoControlador@agregarUsuarioProyecto');
Route::post('/eliminarUsuarioProyecto', 'UsuarioProyectoGrupoControlador@eliminarUsuarioProyecto');
Route::get('/cerrarSesion', 'SesionControlador@cerrarSesion');
Route::get('/cerrarSesionBlog', 'SesionControlador@cerrarSesionBlog');
Route::post('/obtenerProyecto', 'ProyectosControlador@obtenerProyecto');
Route::post('/editarProyecto', 'ProyectosControlador@editarProyecto');
Route::post('/agregarSprint', 'SprintControlador@agregarSprint');
Route::post('/obtenerSprints', 'SprintControlador@obtenerSprints');
Route::post('/obtenerTareas', 'TareaControlador@obtenerTareas');
Route::post('/agregarTarea', 'TareaControlador@agregarTarea');
Route::post('/eliminarTarea', 'TareaControlador@eliminarTarea');
Route::post('/asignarTarea', 'TareaControlador@asignarTarea');
Route::post('/obtenerTareasUsuario', 'TareaUsuarioControlador@UsuarioTarea');
Route::post('/obtenerSprint', 'SprintControlador@obtenerSprint');
Route::post('/editarSprint', 'SprintControlador@editarSprint');
Route::post('/obtenerSprintsActivos', 'SprintControlador@obtenerSprintsActivos');
Route::post('/obtenerTareasSprint', 'SprintControlador@obtenerTareasSprint');
Route::post('/iniciarTarea', 'TareaControlador@iniciarTarea');
Route::get('/TestChat', 'SesionControlador@testChat');
Route::post('/subirPortada', 'PublicacionControlador@subirPortada');
Route::post('/nombrePortada', 'PublicacionControlador@nombrePortada');
Route::get('/test', 'SesionControlador@test');
Route::post('/agregarPublicacion', 'PublicacionControlador@agregarPublicacion');
Route::post('/obtenerPublicaciones', 'PublicacionControlador@obtenerPublicaciones');
Route::post('/eliminarPublicacion', 'PublicacionControlador@eliminarPublicacion');
Route::post('/aprobarPublicacion', 'PublicacionControlador@aprobarPublicacion');
Route::post('/rechazarPublicacion', 'PublicacionControlador@rechazarPublicacion');
Route::post('/permisosDashboard', 'UsuariosControlador@permisosDashboard');
Route::post('/editarPublicacion', 'PublicacionControlador@editarPublicacion');
Route::post('/editarUsuario', 'UsuariosControlador@editarUsuario');
Route::post('/subirEvidencia', 'TareaControlador@subirEvidencia');
Route::post('/subirArchivo', 'ArchivosControlador@subirArchivo');
Route::post('/obtenerArchivos', 'ArchivosControlador@obtenerArchivos');
Route::post('/validarEvidencia', 'TareaControlador@validarEvidencia');
Route::post('/rechazarEvidencia', 'TareaControlador@rechazarEvidencia');
Route::post('/obtenerConversaciones', 'ChatControlador@obtenerConversaciones');
Route::post('/obtenerConversacion', 'ChatControlador@obtenerConversacion');
Route::post('/permisosGrupo', 'GruposControlador@permisosGrupo');
Route::post('/permisosBlog', 'PublicacionControlador@permisosBlog');
Route::post('/permisosProyecto', 'ProyectosControlador@permisosProyecto');
Route::post('/obtenerBlog', 'PublicacionControlador@obtenerBlog');
Route::post('/obtenerProyectos', 'ProyectosControlador@obtenerProyectos');
Route::post('/obtenerBlogs', 'PublicacionControlador@obtenerBlogs');
Route::post('/estadisticaUsuarioGrupo', 'EstadisticasControlador@usuariosGrupo');
Route::post('/estadisticaProyectoGrupo', 'EstadisticasControlador@proyectosGrupo');
Route::post('/estadisticaTareaProyecto', 'EstadisticasControlador@tareasProyecto');
Route::post('/estadisticaIteracionProyecto', 'EstadisticasControlador@iteracionesProyecto');
Route::get('/administrarEstadisticas', 'EstadisticasControlador@verEstadisticas');
Route::post('/estadisticaUsuarioTarea', 'EstadisticasControlador@UsuarioTareas');
Route::post('/terminarProyecto', 'ProyectosControlador@terminarProyecto');
Route::post('/obtenerActividades', 'ProyectosControlador@obtenerActividades');
Route::post('/enviarMensaje', function(){
  if(!Auth::check()){
      return response()->json([
            'status' => 'ERROR',
            'result' => 'Inicia sesion para continuar'
      ]);
  }
  event(new App\Events\Chat(request('idConversacion'), Auth::id(), request('mensaje')));
  $usuarioConversacion = App\UsuarioConversacion::where('idConversacion', request('idConversacion'))->get();

  foreach ($usuarioConversacion as $value) {

        event(new App\Events\NuevoMensaje(request('idConversacion'), $value->idUsuario, "mensaje", NULL, NULL));
  }

  return response()->json([
        'status' => 'OK',
        'result' => 'Mensaje enviado'
  ]);
});
Route::get('/descargarEvidencia/{idTarea}', 'TareaControlador@descargarEvidencia');
Route::get('/descargarArchivo/{idProyecto}/file/{nombre}', 'ArchivosControlador@descargarArchivo');
Route::post('/obtenerArchivosGrupos', 'ArchivosControlador@obtenerArchivosGrupos');
Route::post('/obtenerArchivosProyectos', 'ArchivosControlador@obtenerArchivosProyectos');
Route::get('/verDashboard', 'UsuariosControlador@verDashboard');
Route::post('/Chat', function(){
			event(new App\Events\Chat(request('emisor'), request('receptor'), request('mensaje')));
});
