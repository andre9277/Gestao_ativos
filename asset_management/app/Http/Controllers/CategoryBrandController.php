<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryBrandController extends Controller
{
    public function index()
    {
        $categoryBrands = DB::table('category_brand')->get();

        return response()->json($categoryBrands);
    }
}
