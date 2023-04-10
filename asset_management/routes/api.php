<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AllocationsController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EntityController;
use App\Http\Resources\CategoryResource;
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

    //Endpoint Categorias
    Route::get('/categories', [CategoryController::class, 'index']);


    //Endpoint Entities
    Route::get('/entities', [EntityController::class, 'index']);

    //routes para os assets
    Route::post('/assets', [AssetController::class, 'store']);
    Route::get('/assets', [AssetController::class, 'index']);

    Route::resource('assets', AssetController::class);

    Route::apiResource('/assets', AssetController::class);

    Route::get('/asset', function (Request $request) {
        return $request->asset();
    });

    //Route para os Movimentos dos ativos
    //Route::resource('allocations', AllocationsController::class);
    Route::get('/allocations', [AllocationsController::class, 'index']);
    Route::apiResource('/allocations', AllocationsController::class);
    Route::get('/allocation', function (Request $request) {
        return $request->allocation();
    });
});

//Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signup', [AuthController::class, 'signup'])->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);

/* Route::post('assets', function () {
    return Asset::create([
        'inv' => '32146',
        'brand' => 'Dell',
        'model' => 'JN123',
        'serial' => 'JS92ND03DX',
        'cond' => 'Avariado',
        'piso' => '2',
        'ala' => 'D',
        'ci' => 'CI1023',
        'status' => 'Ativo',
        'local' => 'Hospital de Braga',
        'category_id' => '2'
    ]);
}); */
