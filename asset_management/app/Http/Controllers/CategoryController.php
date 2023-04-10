<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $cat
     * @return \Illuminate\Http\Response
     */
    public function show(Category $cat)
    {
        //
        return new CategoryResource($cat);
    }

    public function index()
    {
        $categories = Category::all(['id', 'name']);
        return response()->json($categories);
    }
}
