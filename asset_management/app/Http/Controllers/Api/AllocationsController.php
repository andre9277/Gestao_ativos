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


    public function downloadCsv()
    {
        $alloc = Allocation::with('users:id,name', 'assets:id,numb_ser,unit_id,numb_inv')
            ->orderBy('id', 'desc')
            ->paginate(20);
        $allData = $alloc->items();
        $currentPage = $alloc->currentPage();
        $totalPages = $alloc->lastPage();

        for ($i = $currentPage + 1; $i <= $totalPages; $i++) {
            $alloc = Allocation::with('users:id,name', 'assets:id,numb_ser,unit_id,numb_inv')
                ->orderBy('id', 'desc')
                ->paginate(20, ['*'], 'page', $i);
            $allData = array_merge($allData, $alloc->items());
        }

        $csvData = "";
        foreach ($allData as $allocation) {
            $csvData .= "{$allocation->users->name},{$allocation->action_type},";
            if ($allocation->assets === null) {
                $csvData .= "{$allocation->inv_number},";
            } else {
                $csvData .= "{$allocation->assets->numb_inv},";
            }
            $csvData .= "{$allocation->allocation_date}\n";
        }

        return response($csvData)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="relatorioMov.csv"');
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
