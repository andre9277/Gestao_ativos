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
}
