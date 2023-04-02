<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\AssetController;
use App\Models\Asset;
use Illuminate\Http\Request;
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

//endpoints que têm acesso
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //ApiResource no endpoint users
    Route::apiResource('/users', UserController::class);

    //Route::resource('/usere', UserController::class);



    //routes para os assets
    Route::post('/assets', [AssetController::class, 'store']);
    Route::get('/assets', [AssetController::class, 'index']);

    Route::resource('assets', AssetController::class);

    Route::apiResource('/assets', AssetController::class);

    Route::get('/asset', function (Request $request) {
        return $request->asset();
    });
});

//Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signup', [AuthController::class, 'signup'])->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);

Route::post('assets', function () {
    return Asset::create([
        'inv' => '456234',
        'brand' => 'TMN',
        'model' => 'LAS91',
        'serial' => 'ASF9018H43',
        'cond' => 'Reparação',
        'ala' => 'C',
        'ci' => 'CI7396',
        'status' => 'Ativo',
        'local' => 'Hospital de Braga',
        'category_id' => '1'
    ]);
});
