<?php

namespace App\Http\Controllers;

use App\Http\Resources\BrandResource;
use App\Models\Brand;
use App\Models\CategoryBrand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Brand  $brd
     * @return \Illuminate\Http\Response
     */
    public function show(Brand $brd)
    {
        //
        return new BrandResource($brd);
    }

    public function index()
    {
        $brands = Brand::all(['id', 'name']);
        return response()->json($brands);
    }

    public function indexSig()
    {
        $brands = Brand::all(['id', 'name']);
        return response()->json($brands);
    }



    public function getBrandsByCategory($categoryId)
    {
        $brandIds = CategoryBrand::where('category_id', $categoryId)->pluck('brand_id')->toArray();

        $brands = Brand::whereIn('id', $brandIds)->get(['id', 'name']);

        return response()->json($brands);
    }
}
