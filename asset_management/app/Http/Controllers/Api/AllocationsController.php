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
        //In the Asset Movement the user with id=3 wont see the last 2 columns of the table
        $this->authorize('allocations');

        $alloc = Allocation::with('users:id,name', 'assets:id,numb_ser,unit_id,numb_inv',)
            ->orderBy('id', 'desc')
            ->paginate(20);

        return AllocationResource::collection($alloc);

        /*  $allocations = Allocation::with('users:id,name', 'assets:id,numb_ser,unit_id,numb_inv')
            ->orderBy('id', 'desc')
            ->paginate(20);
        return $allocations; */
    }

    public function indexAllocation()
    {
        $this->authorize('allocations');

        $allocations = Allocation::with('users:id,name', 'assets:id,numb_ser,unit_id', 'assets.category:id,name')
            ->orderBy('allocations.allocation_date', 'desc')
            ->get();

        return AllocationResource::collection($allocations);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Allocation  $asset
     * @return \Illuminate\Http\Response
     */
    public function show(Allocation $allocation)
    {
        $this->authorize('allocations');
        //
        return new AllocationResource($allocation);
    }
}
