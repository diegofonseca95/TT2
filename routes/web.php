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
Route::post('/eliminarUsuario', 'UsuariosControlador@eliminarUsuario');
Route::post('/validarUsuario', 'UsuariosControlador@validarUsuario');
Route::post('/obtenerGrupos', 'GruposControlador@obtenerGrupos');
Route::post('/obtenerGrupo', 'GruposControlador@obtenerGrupo');
Route::post('/eliminarGrupo', 'GruposControlador@eliminarGrupo');
Route::post('/obtenerUsuariosGrupo', 'GruposControlador@obtenerUsuariosGrupo');
//Route::get('/recuperarContrasena?userId={userId}', 'SesionControlador@recuperarContrasena');
Route::get('/editarGrupo/{idGrupo}', 'GruposControlador@editarGrupo');
//Route::get('/publicacionesGrupo/{idGrupo}', 'PublicacionControlador@publicacionesGrupo');
Route::get('/publicacionesGrupo', 'PublicacionControlador@publicacionesGrupo');
Route::post('/recuperarContrasena', 'SesionControlador@recuperarContrasena');
Route::get('/iniciarSesionAdmin', 'SesionControlador@iniciarSesionAdmin');