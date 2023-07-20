<?php

namespace App\Http\Controllers;

use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Supplier  $sp
     * @return \Illuminate\Http\Response
     */
    public function show(Supplier $sp)
    {
        //
        return new SupplierResource($sp);
    }

    public function index()
    {
        $suppliers = Supplier::all(['id', 'name', 'email', 'phone', 'address']);
        return response()->json($suppliers);
    }

    public function indexAll()
    {
        $suppliers = Supplier::all(['id', 'name']);
        return response()->json($suppliers);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:suppliers',
        ]);

        $supplier = Supplier::create([
            'name' => $request->input('name'),
        ]);

        return response()->json($supplier, 201);
    }

    public function destroy(Supplier $supplier)
    {
        // Implement logic to delete the supplier
        // Don't forget to handle any related dependencies, if any
        $supplier->delete();

        return response()->json(null, 204);
    }
}
