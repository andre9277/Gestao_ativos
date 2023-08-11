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
        $this->authorize('create-delete-users');

        $data = $request->validate([
            'category_id' => 'required|integer',
            'brand_id' => 'required|integer',
        ]);

        $categoryBrand = CategoryBrand::create($data);

        return response()->json($categoryBrand, 201);
    }

    public function destroy($id)
    {
        $this->authorize('create-delete-users');
        try {
            // Find the categoryBrand relation by ID
            $categoryBrand = CategoryBrand::findOrFail($id);

            // Delete the relation
            $categoryBrand->delete();

            // Return a success response
            return response()->json(['message' => 'Category and brand relation deleted successfully'], 200);
        } catch (\Exception $e) {
            // Handle any errors that occurred during the deletion
            return response()->json(['error' => 'Failed to delete category and brand relation'], 500);
        }
    }

     //Update Function
     public function update(Request $request, $id)
     {
        $this->authorize('create-delete-users');
         $data = $request->validate([
             'category_id' => 'required|integer',
             'brand_id' => 'required|integer',
         ]);
 
         $categoryBrand = CategoryBrand::findOrFail($id);
         $categoryBrand->update($data);
 
         return response()->json($categoryBrand, 200);
     }
}
