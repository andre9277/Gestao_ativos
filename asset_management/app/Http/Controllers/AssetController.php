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

class AssetController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $assets = Asset::with('entity:id,ent_name', 'brand:id,sig', 'modelo:id,name', 'category:id,name', 'units:id,unit_contact,unit_address,name', 'suppliers:id,name,email,phone,address')
            ->orderBy('id', 'desc')
            ->paginate(20);

        return AssetResource::collection($assets);
    }

    //For the dashboard grafics
    public function indexDashb()
    {
        $dashb = Asset::select(['ent_id', 'cat_id'])->get();
        return response()->json($dashb);
    }


    //Filter values for the ci, ent_id or unit_id atributes
    public function filterValues()
    {
        $assets = Asset::with('entity:id,ent_name,ent_type', 'brand:id,name,sig', 'modelo:id,name', 'category:id,name', 'units:id,unit_contact,unit_address,name', 'suppliers:id,name,email,phone,address')
            ->where(function ($query) {
                $query->whereNotNull('previous_ci')
                    ->orWhereNotNull('previous_ent_id')
                    ->orWhereNotNull('previous_unit_id');
            })
            ->orderBy('updated_at', 'desc')
            ->paginate(20);

        return AssetResource::collection($assets);
    }

    public function filterValuesNoPag()
    {
        $assets = Asset::with('entity:id,ent_name,ent_type', 'brand:id,name,sig', 'modelo:id,name', 'category:id,name', 'units:id,unit_contact,unit_address,name', 'suppliers:id,name,email,phone,address')
            ->where(function ($query) {
                $query->whereNotNull('previous_ci')
                    ->orWhereNotNull('previous_ent_id')
                    ->orWhereNotNull('previous_unit_id');
            })
            ->orderBy('updated_at', 'desc')
            ->get();

        return AssetResource::collection($assets);
    }


    public function indexAll()
    {
        /* $assets = Asset::select(['id', 'numb_inv', 'floor'])
            ->with('category: id, name', 'brand:id,sig', 'modelo:id,model_name')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($assets); */
        $assets = $assets = Asset::with('entity:id,ent_name', 'brand:id,sig', 'modelo:id,name', 'category:id,name', 'units:id,unit_contact,unit_address,name', 'suppliers:id,name,email,phone,address')
            ->select('id', 'numb_inv', 'created_at', 'cat_id', 'model_id', 'brand_id', 'floor', 'ent_id', 'unit_id', 'numb_ser', 'ci', 'previous_ci', 'date_purch', 'state', 'cond', 'ala', 'floor', 'previous_unit_id', 'previous_ent_id', 'supplier_id', 'obs')
            ->orderBy('id', 'desc')
            ->get();

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
            'ser_number' => $asset->numb_ser,
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
            'ser_number' => $asset->numb_ser,
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
            'ser_number' => $asset->numb_ser,

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
    public function destroy($ids)
    {
        $this->authorize('delete');

        // Convert the comma-separated string of IDs to an array
        $assetIds = explode(',', $ids);

        // Retrieve the assets before deletion
        $assets = Asset::whereIn('id', $assetIds)->get();

        // Delete the assets
        Asset::whereIn('id', $assetIds)->delete();


        // Create allocation records for the deleted assets
        foreach ($assets as $asset) {
            $allocation = new Allocation([
                'ser_number' => $asset->numb_ser,
                'action_type' => 'Apaga',
                'user_id' => Auth::id(),
                'allocation_date' => now(),
            ]);
            $allocation->save();
        }

        // Return a response indicating success
        return response()->json(['message' => 'Assets deleted successfully']);
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

    //Floor Levels 
    function get_floor_levels()
    {
        $floor_levels = [-1, 0, 1, 2, 3, 4, 5];
        $result = array_map(function ($floor_level) {
            return ['name' => $floor_level];
        }, $floor_levels);
        return $result;
    }


    //Gets the asset values from the current inventory number
    public function getAllAssets(Request $request)
    {
        $assetNumber = $request->query('numb_inv');

        $assets = Asset::where('numb_inv', $assetNumber)->get();

        return response()->json($assets);
    }

    public function getAllAssetsSer(Request $request)
    {
        $assetNumber = $request->query('numb_ser');

        $assets = Asset::where('numb_ser', $assetNumber)->get();

        return response()->json($assets);
    }
}
