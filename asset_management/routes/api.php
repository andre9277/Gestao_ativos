<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AllocationsController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EntityController;
use App\Http\Controllers\ExcelImportController;
use App\Http\Controllers\ModeloController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UnitController;
use App\Models\Asset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

//endpoints the user has access when login
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //ApiResource in endpoint users
    Route::apiResource('/users', UserController::class);
    Route::get('/usersAll', [UserController::class, 'indexAll']);

    //Endpoint Categories
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/catName', [CategoryController::class, 'indexCat']);

    //Endpoint Entities
    Route::get('/entities', [EntityController::class, 'index']);

    //Endpoint Units
    Route::get('/units', [UnitController::class, 'index']);
    Route::get('/unitss', [UnitController::class, 'getUnitsByEntity']);

    //routes para os assets
    Route::post('/assets', [AssetController::class, 'store']);
    Route::get('/assets', [AssetController::class, 'index']);
    Route::get('/floorLevel', [AssetController::class, 'get_floor_levels']);
    Route::get('/getDashb', [AssetController::class, 'indexDashb']);

    Route::resource('assets', AssetController::class);
    Route::apiResource('/assets', AssetController::class);
    Route::get('/asset', function (Request $request) {
        return $request->asset();
    });

    Route::get('/allAssets', [AssetController::class, 'indexAll']);


    //get the name of the previous unit name
    Route::get('assets/{id}/previous-unit-name', [AssetController::class, 'showPrevious']);

    Route::get('/assetsC', [AssetController::class, 'count']);
    Route::get('/filterVal', [AssetController::class, 'filterValues']);

    /* Route::get('/download-csv', [AllocationsController::class, 'downloadCsv']); */


    //Route for the Asset Movement
    Route::resource('allocations', AllocationsController::class);
    Route::get('/allocations', [AllocationsController::class, 'index']);
    Route::apiResource('/allocations', AllocationsController::class);
    Route::get('/allocation', function (Request $request) {
        return $request->allocation();
    });
    Route::get('/allocationAll', [AllocationsController::class, 'indexAllocation']);


    //Endpoint Brands
    Route::get('/brands', [BrandController::class, 'index']);
    Route::get('/brandsSig', [BrandController::class, 'indexSig']);

    //Endpoint Models
    Route::get('/modelos', [ModeloController::class, 'index']);
    Route::get('/modelsHb', [ModeloController::class, 'getModelsByEntity']);
    Route::get('/modelosName', [ModeloController::class, 'indexName']);
    //Endpoint Supplier
    Route::get('/supplier', [SupplierController::class, 'index']);

    Route::post('/import', [ExcelImportController::class, 'import']);
    Route::get('/download-template', [ExcelImportController::class, 'downloadTemplate'])->name('download.template');;
});

//Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signup', [AuthController::class, 'signup'])->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
