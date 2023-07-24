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

    public function indexCat()
    {
        $categories = Category::all(['name']);
        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|unique:categories,name',
        ]);

        $category = Category::create($data);

        return response()->json($category, 201);
    }

    public function destroy(Category $cat)
    {
        $cat->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        ]);

        $category->update([
            'name' => $request->input('name'),
        ]);

        return response()->json($category, 200);
    }
}
