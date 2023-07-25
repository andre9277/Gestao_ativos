<?php

namespace App\Http\Controllers;

use App\Http\Resources\ModeloResource;
use App\Models\Modelo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ModeloController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Modelo  $mdl
     * @return \Illuminate\Http\Response
     */
    public function show(Modelo $mdl)
    {
        //
        return new ModeloResource($mdl);
    }

    public function index()
    {
        $modelos = Modelo::all(['id', 'name', 'brand_id']);
        return response()->json($modelos);
    }

    public function indexName()
    {
        $modelos = Modelo::all(['id', 'name', 'brand_id'])->toArray();
        return response()->json($modelos);
    }

    public function getModelsByEntity(Request $request): JsonResponse
    {
        $brandId = $request->query('brand_id');

        $models_hb = Modelo::where('brand_id', $brandId)->get();

        return response()->json($models_hb);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'brand_id' => 'required|integer',
        ]);

        $model = Modelo::create($data);

        return response()->json($model, 201);
    }

    public function destroy(Modelo $mdl)
    {
        $mdl->delete();

        return response()->json(['message' => 'Modelo eliminado com sucesso!']);
    }

    public function update(Request $request, Modelo $mdl)
    {
        $request->validate([
            'name' => 'required|string|max:255' . $mdl->id,
        ]);

        $mdl->update([
            'name' => $request->input('name'),
        ]);

        return response()->json($mdl, 200);
    } 
}
