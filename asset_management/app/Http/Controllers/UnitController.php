<?php

namespace App\Http\Controllers;

use App\Http\Resources\UnitResource;
use App\Models\Unit;
use Illuminate\Http\JsonResponse;
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

    public function indexAll()
    {
        $entities = Unit::all(['id', 'name']);
        return response()->json($entities);
    }

    public function getUnitsByEntity(Request $request): JsonResponse
    {
        $entId = $request->query('ent_id');

        $units = Unit::where('ent_id', $entId)->get();

        return response()->json($units);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255|unique:units',
            'ent_id' => 'required|integer',
        ]);

        $unit = Unit::create(
            $data
        );

        return response()->json($unit, 201);
    }

    public function destroy(Unit $unit)
    {
        try {
            $unit->delete();
            return response()->json(['message' => 'Unit deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting unit'], 500);
        }
    }
    public function update(Request $request, Unit $unt)
    {
        $request->validate([
            'name' => 'required|string|max:255' . $unt->id,
        ]);

        $unt->update([
            'name' => $request->input('name'),
        ]);

        return response()->json($unt, 200);
    } 
}
