<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

//Request que utiliza auth:sanctum, permite autenticar os requests utilizando um API token gerado pelo Sanctum
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

//Sanctum verifica se o request contem um API token válido: 
//-Caso seja válido, o request tem permissão a proceder
//-Caso o token seja inválido ou em falta, o request é rejeitado com resposta 401 Unauthorized