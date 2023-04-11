<?php

namespace App\Http\Controllers;

use App\Http\Resources\UnitResource;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function show(Unit $unit)
    {
        //
        return new UnitResource($unit);
    }

    public function index()
    {
        $entities = Unit::all(['id', 'unit_contact', 'unit_address', 'ent_id', 'name']);
        return response()->json($entities);
    }
}
