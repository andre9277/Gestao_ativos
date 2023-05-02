<?php

namespace App\Http\Controllers\Api;


use App\Http\Resources\AllocationResource;
use App\Models\Allocation;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use League\Csv\Writer;
use SplTempFileObject;


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

    //For backend download CSV
    /* public function downloadCSV(Request $request)
    {
        // Retrieve all the allocations from the database
        $allocations = Allocation::with('users', 'assets')->get();

        // Apply the filters if they are present
        if ($request->has('selectedInv')) {
            $allocations = $allocations->filter(function ($allocation) use ($request) {
                return $allocation->assets && $allocation->assets->numb_inv === $request->selectedInv;
            });
        }

        if ($request->has('selectedOp')) {
            $allocations = $allocations->filter(function ($allocation) use ($request) {
                return $allocation->action_type === $request->selectedOp;
            });
        }

        if ($request->has('selectedUser')) {
            $allocations = $allocations->filter(function ($allocation) use ($request) {
                return $allocation->users && $allocation->users->name === $request->selectedUser;
            });
        }

        // Create the CSV file
        $csv = Writer::createFromFileObject(new SplTempFileObject());

        $csv->insertOne(['Utilizador', 'Operação', 'Nº Inventário', 'Data de alteração']);

        foreach ($allocations as $allocation) {
            $csv->insertOne([
                $allocation->users->name,
                $allocation->action_type,
                $allocation->assets ? $allocation->assets->numb_inv : $allocation->inv_number,
                $allocation->allocation_date,
            ]);
        }

        // Generate the CSV file and send it to the client
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="relatorioMov.csv"',
        ];

        return Response::make($csv->__toString(), 200, $headers);
    } */
}
