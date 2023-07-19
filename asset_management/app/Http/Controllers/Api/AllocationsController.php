<?php

namespace App\Http\Controllers\Api;


use App\Http\Resources\AllocationResource;
use App\Models\Allocation;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAllocationRequest;
use App\Models\Asset;

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

        $allocations = Allocation::with('users:id,name', 'assets:id,numb_ser,numb_inv,unit_id,ci,previous_unit_id,previous_ent_id,previous_ci', 'assets.category:id,name')
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

    public function addAssetMovement(StoreAllocationRequest $request)
    {
        // Access the values from the request
        $allocationDate = $request->input('allocation_date');
        $reason = $request->input('reason');
        $other = $request->input('other');
        $actionType = $request->input('action_type');
        $serNumber = $request->input('ser_number');
        $userId = $request->input('user_id');
        $assetId = $request->input('asset_id');


        $move = new Allocation();
        $move->allocation_date = $allocationDate;
        $move->reason = $reason;
        $move->other = $other;
        $move->action_type = $actionType;
        $move->ser_number = $serNumber;
        $move->user_id = $userId;
        $move->asset_id = $assetId;

        $move->save();

        return response()->json(['message' => 'Data stored successfully']);
    }
}
