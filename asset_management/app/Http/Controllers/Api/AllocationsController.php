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
        $alloc = Allocation::with('users:id,name', 'assets:id,numb_ser,unit_id,numb_inv')
            ->orderBy('id', 'desc')
            ->paginate(20);

        return AllocationResource::collection($alloc);
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
