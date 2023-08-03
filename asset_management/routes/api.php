<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AllocationsController;

use App\Http\Controllers\AssetController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EntityController;
use App\Http\Controllers\ExcelImportController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ModeloController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\CategoryBrandController;
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

// routes/api.php
//Sends the link for the password
Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);

Route::post('/reset-password', [ForgotPasswordController::class, 'reset']);




Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    //ApiResource in endpoint users
    Route::apiResource('/users', UserController::class);
    Route::get('/usersAll', [UserController::class, 'indexAll']);
    Route::get('/userAllo', [UserController::class, 'usersAllocations']);


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
    Route::get('/assetsObso', [AssetController::class, 'indexObso']);
    Route::get('/assetsRep', [AssetController::class, 'indexRep']);

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
    Route::get('/filterValuesNoPag', [AssetController::class, 'filterValuesNoPag']);

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

    //Gets the values of the asset by inventory number
    Route::get('/assetSearch', [AssetController::class, 'getAllAssets']);
    //Gets the values of the asset by serial number
    Route::get('/assetSearchSer', [AssetController::class, 'getAllAssetsSer']);


    Route::post('/assetMovement', [AllocationsController::class, 'addAssetMovement']);

    Route::get('/brands/category/{categoryId}', [BrandController::class, 'getBrandsByCategory']);

    //Adds/delete/edit values to the brands table
    Route::post('/brandsAdd', [BrandController::class, 'store']);
    Route::delete('/brandsDel/{brd}', [BrandController::class, 'destroy']);
    Route::put('/brandUpdate/{brand}',  [BrandController::class, 'update']);


    Route::post('/categoryBrands', [CategoryBrandController::class, 'store']);

    //Add and delete one model:
    Route::post('/modelsAdd', [ModeloController::class, 'store']);
    Route::delete('/modelsDel/{mdl}',  [ModeloController::class, 'destroy']);
    Route::put('/mdlUpdate/{mdl}',  [ModeloController::class, 'update']);

    //Add and delete one category:
    Route::post('/categoriesAdd', [CategoryController::class, 'store']);
    Route::delete('/categoriesDel/{cat}',  [CategoryController::class, 'destroy']);
    Route::put('/categoriesUpdate/{category}',  [CategoryController::class, 'update']);


    //Add and delete one supplier:
    Route::post('/supplierAdd', [SupplierController::class, 'store']);
    Route::delete('/supplierDel/{supplier}',  [SupplierController::class, 'destroy']);
    Route::put('/supUpdate/{sup}', [SupplierController::class, 'update']);

    //Add and delete one entity:
    Route::post('/entAdd', [EntityController::class, 'store']);
    Route::delete('/entDel/{ent}',  [EntityController::class, 'destroy']);
    Route::put('/entsUpdate/{ent}', [EntityController::class, 'update']);

    //Add and delete one unit:
    Route::post('/unitAdd', [UnitController::class, 'store']);
    Route::delete('/unitDel/{unit}',  [UnitController::class, 'destroy']);
    Route::put('/unitUpdate/{unt}', [UnitController::class, 'update']);


    //Endpoint for the AssetForm component (Joins all the calls, does one request do the server)
    Route::get('/combinedData', function () {

        $allCats = getCatsAll();
        $allEnts = getEntsAll();
        $allUnits = getUnitsAll();
        $allBrands = getBrandsAll();
        $allModels = getModelAll();
        $allSupp = getSupplierAll();


        return response()->json([
            'cats' => $allCats,
            'ents' => $allEnts,
            'units' => $allUnits,
            'brands' => $allBrands,
            'models' => $allModels,
            'suppliers' => $allSupp,

        ]);
    });

    Route::get('/reportAll', function () {
        $allUnits = getUnitsAll();
        $allEnts = getEntsAll();
        $allocationAll = getAllocationAll();
        $allCats = getCatsAll();

        return response()->json([
            'units' => $allUnits,
            'ents' => $allEnts,
            'allocations' => $allocationAll,
            'categories' => $allCats,

        ]);
    });


    Route::get('/assetsDefault', function () {
        $allCats = getCatsAll();
        $allBrands = getBrandsAll();
        $allModels = getModelAll();
        $allFloor = getFloors();
        $allAssets = getAllAssets();
        $allLocals = getEntsAll();

        return response()->json([
            'cats' => $allCats,
            'brands' => $allBrands,
            'models' => $allModels,
            'floor' => $allFloor,
            'assets' => $allAssets,
            'localiz' => $allLocals,
        ]);
    });

    Route::delete('/assets/{ids}', [AssetController::class, 'destroy']);

    //show the category and brands relationship
    Route::get('/category-brands', [CategoryBrandController::class, 'index']);
    Route::delete('/category-brandsDel/{id}', [CategoryBrandController::class, 'destroy']);
    Route::put('/catgBrd/{id}', [CategoryBrandController::class, 'update' ]);

    function getCatsAll()
    {
        $response = app(CategoryController::class)->index();
        $values = $response->getData();

        return $values;
    }

    function getEntsAll()
    {
        $response = app(EntityController::class)->indexAll();
        $values = $response->getData();

        return $values;
    }

    function getUnitsAll()
    {
        $response = app(UnitController::class)->indexAll();
        $values = $response->getData();

        return $values;
    }

    function getBrandsAll()
    {
        $response = app(BrandController::class)->indexSig();
        $values = $response->getData();

        return $values;
    }

    function getModelAll()
    {
        $response = app(ModeloController::class)->indexName();
        $values = $response->getData();

        return $values;
    }
    function getSupplierAll()
    {
        $response = app(SupplierController::class)->indexAll();
        $values = $response->getData();

        return $values;
    }

    function getAllocationAll()
    {
        $response = app(AllocationsController::class)->indexAllocation();
        $values = $response;

        return $values;
    }

    function getFloors()
    {
        $response = app(AssetController::class)->get_floor_levels();
        $values = $response;

        return $values;
    }

    function getAllAssets()
    {
        $response = app(AssetController::class)->indexAll();
        $values = $response;

        return $values;
    }

    function getAllLocals()
    {
        $response = app(EntityController::class)->indexAll();
        $values = $response;

        return $values;
    }
});

//Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signup', [AuthController::class, 'signup'])->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);

Route::post('/log', [AuthController::class, 'log']);
