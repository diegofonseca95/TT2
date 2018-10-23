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

Route::get('/', function () {

	$tasks = App\Usuario::all();
	return $tasks;

    //return view('welcome');
});

Route::get('/', 'UsuariosControlador@index');
Route::get('/agregarUsuario', 'UsuariosControlador@agregarUsuario');
Route::post('/agregarUsuario', 'UsuariosControlador@agregarUsuarioBD');
Route::post('/obtenerUsuario', 'UsuariosControlador@obtenerUsuario');
Route::post('/iniciarSesion', 'SesionControlador@iniciarSesion');
Route::get('/administrarUsuarios','UsuariosControlador@administrarUsuarios');
Route::get('/administrarGrupos', 'GruposControlador@verGrupos');
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
Route::get('/publicacionesGrupo', 'PublicacionControlador@publicacionesGrupo');
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
Route::post('/eliminarUsuarioGrupo', 'UsuarioGrupoControlador@eliminarUsuarioGrupo');
Route::post('/eliminarProyecto', 'ProyectoGrupoControlador@eliminarProyectoGrupo');
Route::post('/obtenerIdUsuariosProyecto', 'ProyectosControlador@obtenerUsuariosProyecto');
Route::post('/agregarUsuariosProyecto', 'UsuarioProyectoGrupoControlador@agregarUsuarioProyecto');
Route::post('/eliminarUsuarioProyecto', 'UsuarioProyectoGrupoControlador@eliminarUsuarioProyecto');
Route::get('/cerrarSesion', 'SesionControlador@cerrarSesion');
Route::post('/obtenerProyecto', 'ProyectosControlador@obtenerProyecto');
Route::post('/editarProyecto', 'ProyectosControlador@editarProyecto');
Route::post('/agregarSprint', 'SprintControlador@agregarSprint');
Route::post('/obtenerSprints', 'SprintControlador@obtenerSprints');
Route::post('/obtenerTareas', 'TareaControlador@obtenerTareas');
Route::post('/agregarTarea', 'TareaControlador@agregarTarea');
Route::post('/eliminarTarea', 'TareaControlador@eliminarTarea');
Route::post('/asignarTarea', 'TareaControlador@asignarTarea');
