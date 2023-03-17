<?php

//Acede a Controller, o que permite invocar o método register criado e os route parametros serão passados para o método
use App\Http\Controllers\Api\AuthController;

use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Sempre que for realizada um Post request:
 Route::post('/signup', [AuthController::class, 'signup']);  
 Route::post('/login', [AuthController::class, 'login']);  
 Route::post('/logout', [AuthController::class, 'logout']);  