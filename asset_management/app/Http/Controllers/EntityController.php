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
        $entities = Entity::all(['id', 'ent_name', 'ent_type']);
        return response()->json($entities);
    }

    public function indexAll()
    {
        $entities = Entity::all(['id', 'ent_name as name']);
        return response()->json($entities);
    }
}
