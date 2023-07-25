<?php

namespace App\Http\Controllers;

use App\Http\Resources\EntityResource;
use App\Models\Entity;
use Illuminate\Http\Request;

class EntityController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Entity  $ent
     * @return \Illuminate\Http\Response
     */
    public function show(Entity $ent)
    {
        //
        return new EntityResource($ent);
    }

    public function index()
    {
        $entities = Entity::all(['id', 'name', 'ent_type']);
        return response()->json($entities);
    }

    public function indexAll()
    {
        $entities = Entity::all(['id', 'name']);
        return response()->json($entities);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:suppliers',
        ]);

        $ent = Entity::create([
            'name' => $request->input('name'),
        ]);

        return response()->json($ent, 201);
    }

    public function destroy(Entity $ent)
    {
        // Implement logic to delete the supplier
        // Don't forget to handle any related dependencies, if any
        $ent->delete();

        return response()->json(null, 204);
    }

    //Update entity
    public function update(Request $request, Entity $ent)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $ent->id,
        ]);

        $ent->update([
            'name' => $request->input('name'),
        ]);

        return response()->json($ent, 200);
    }
}
