<?php

namespace App\Http\Controllers\Api;


use App\Http\Resources\AllocationResource;
use App\Models\Allocation;
use App\Http\Controllers\Controller;

class AllocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return AllocationResource::collection(Allocation::query()->orderBy('id', 'desc')->paginate(10));
    }




    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Allocation  $asset
     * @return \Illuminate\Http\Response
     */
    public function show(Allocation $allocation)
    {
        //
        return new AllocationResource($allocation);
    }
}
