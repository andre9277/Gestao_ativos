<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Http\Requests\StoreAssetRequest;
use App\Http\Requests\UpdateAssetRequest;
use App\Http\Resources\AssetResource;
use App\Models\Allocation;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class AssetController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $assets = Asset::with('entity:id,ent_name', 'brand:id,sig', 'modelo:id,model_name', 'category:id,name', 'units:id,unit_contact,unit_address,name', 'suppliers:id,name,email,phone,address')
            ->orderBy('id', 'desc')
            ->paginate(20);

        return AssetResource::collection($assets);
    }

    public function indexDashb()
    {
        $dashb = Asset::select(['ent_id', 'cat_id'])
            ->orderBy('id', 'desc')
            ->paginate(20);
        return response()->json($dashb);
    }

    public function filterValues()
    {
        $assets = Asset::with('entity:id,ent_name,ent_type', 'brand:id,name,sig', 'modelo:id,model_name', 'category:id,name', 'units:id,unit_contact,unit_address,name', 'suppliers:id,name,email,phone,address')
            ->where(function ($query) {
                $query->whereNotNull('previous_ci')
                    ->orWhereNotNull('previous_ent_id')
                    ->orWhereNotNull('previous_unit_id');
            })
            ->orderBy('id', 'desc')
            ->paginate(20);

        return AssetResource::collection($assets);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $brands = Brand::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAssetRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAssetRequest $request)
    {
        $this->authorize('create-edit');

        $asset = Asset::create($request->all());

        // Create a new allocation record for the asset with action type "create"
        $allocation = new Allocation([
            'allocation_date' => now(),
            'action_type' => 'Adiciona',
            'inv_number' => $asset->numb_inv,
            'user_id' => auth()->user()->id
        ]);

        // Associate the new allocation record with the asset
        $asset->allocations()->save($allocation);

        return $asset;
    }

    //For the dashboard statistics
    public function count(Asset $asset)
    {

        $total = $asset::count();

        // Count assets changed this month
        $countChanged = $asset::whereMonth('updated_at', '=', now()->month)->count();

        $totalRep = $asset::where('cond', 'Reparação')->count();

        return [
            'total' => $total,
            'countChanged' => $countChanged,
            'totalRep' => $totalRep
        ];
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Asset  $asset
     * @return \Illuminate\Http\Response
     */
    public function show(Asset $asset)
    {
        // Create a new asset update record for the action_type 'show'
        $update = new Allocation([
            'asset_id' => $asset->id,
            'user_id' => Auth::id(),
            'allocation_date' => now(),
            'action_type' => 'Pesquisa',
            'inv_number' => $asset->numb_inv,
        ]);
        $update->save();
        return new AssetResource($asset);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Asset  $asset
     * @return \Illuminate\Http\Response
     */
    public function edit(Asset $asset)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAssetRequest  $request
     * @param  \App\Models\Asset  $asset
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAssetRequest $request, Asset $asset)
    {
        $this->authorize('create-edit');


        //$asset = Asset::find($id);
        $asset->update($request->all());

        // create a new asset update record
        $update = new Allocation([
            'asset_id' => $asset->id,
            'user_id' => Auth::id(),
            'allocation_date' => now(),
            'action_type' => 'Atualiza',
            'inv_number' => $asset->numb_inv,

        ]);
        $update->save();
        return $asset;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Asset  $asset
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {


        $this->authorize('delete');

        $asset = Asset::findOrFail($id);

        // Save a copy of the asset ID and inventory number
        $inventoryNumber = $asset->numb_inv;

        // Delete the asset
        $asset->delete();

        // Create an allocation record to track the deletion
        $allocation = new Allocation([
            'inv_number' => $inventoryNumber,
            'action_type' => 'Apaga',
            'user_id' => Auth::id(),
            'allocation_date' => now(),
        ]);
        $allocation->save();
    }

    //Show the previous unit name of one Asset
    public function showPrevious($id)
    {
        $asset = Asset::with('previousUnit')->find($id);
        if (!$asset) {
            return response()->json(['error' => 'Asset not found'], 404);
        }

        $unitName = $asset->previousUnit->name;

        return response()->json(['unit_name' => $unitName]);
    }

    public function import(Request $request)
    {
        $this->authorize('import');

        $file = $request->file('file');

        Excel::import($file, function ($rows) {
            foreach ($rows as $row) {
                Asset::create([
                    'numb_inv' => $row[0],
                    'date_purch' => $row[1],
                    'state' => $row[2],
                    'numb_ser' => $row[3],
                    'cond' => $row[4],
                    'ala' => $row[5],
                    'floor' => $row[6],
                    'ci' => $row[7],

                ]);
            }
        });

        return redirect()->back()->with('success', 'Dados importados com sucesso!');
    }


    function get_floor_levels()
    {
        $floor_levels = [-1, 0, 1, 2, 3, 4, 5];
        $result = array_map(function ($floor_level) {
            return ['name' => $floor_level];
        }, $floor_levels);
        return $result;
    }
}
