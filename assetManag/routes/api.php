<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::post('register',[AuthController::class ,'register']);
Route::post('login', [AuthController::class, 'login']);

//Retornar o utilizador autenticado
Route::middleware('auth:sanctum')->group(function(){
    Route::get('user',[AuthController::class ,'user']);
    //Para realizarmos o logout, o utilizador necessita de estar autenticado
    Route::post('logout', [AuthController::class, 'logout']);
});
