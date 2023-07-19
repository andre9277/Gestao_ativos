<?php

namespace App\Http\Controllers;

use App\Models\CategoryBrand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryBrandController extends Controller
{
    public function index()
    {
        $categoryBrands = CategoryBrand::all();

        return response()->json($categoryBrands);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => 'required|integer',
            'brand_id' => 'required|integer',
        ]);

        $categoryBrand = CategoryBrand::create($data);

        return response()->json($categoryBrand, 201);
    }
}
