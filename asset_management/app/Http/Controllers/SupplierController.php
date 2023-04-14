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
}
