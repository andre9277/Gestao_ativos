<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Brand;

class CategoryBrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create categories
        $category1 = Category::create(['name' => 'Computador']);
        $category2 = Category::create(['name' => 'Telefone']);
        $category3 = Category::create(['name' => 'Impressora']);
        // Create brands
        $brand1 = Brand::create(['name' => 'HP']);
        $brand2 = Brand::create(['name' => 'Acer']);
        $brand3 = Brand::create(['name' => 'Asus']);
        $brand4 = Brand::create(['name' => 'Alcatel']);
        $brand5 = Brand::create(['name' => 'Brother']);

        // Associate brands with categories
        $category1->brands()->attach([$brand1->id, $brand2->id, $brand3->id]);
        $category2->brands()->attach($brand4->id);
        $category3->brands()->attach($brand5->id);
    }
}
