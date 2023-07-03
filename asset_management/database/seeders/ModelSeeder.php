<?php

namespace Database\Seeders;

use App\Models\Modelo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use App\Models\Brand;

class ModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // Retrieve the brands
        $brand1 = Brand::where('name', 'HP')->first();
        $brand2 = Brand::where('name', 'Acer')->first();
        $brand3 = Brand::where('name', 'Asus')->first();
        $brand4 = Brand::where('name', 'Alcatel')->first();
        $brand5 = Brand::where('name', 'Brother')->first();

        // Create models for each brand
        $models = [
            // Models for the HP brand
            ['name' => 'JN1_HP', 'brand_id' => $brand1->id],
            ['name' => 'JN2_HP', 'brand_id' => $brand1->id],

            // Models for the Acer brand
            ['name' => 'KO2_Acer', 'brand_id' => $brand2->id],
            ['name' => 'KO3_Acer', 'brand_id' => $brand2->id],

            // Models for the Asus brand
            ['name' => 'HN6_Asus', 'brand_id' => $brand3->id],
            ['name' => 'HU7_Asus', 'brand_id' => $brand3->id],

            // Models for the Alcatel brand
            ['name' => 'PO9_Alcatel', 'brand_id' => $brand4->id],
            ['name' => 'PO2_Alcatel', 'brand_id' => $brand4->id],

            // Models for the Brother brand
            ['name' => 'LH5_Brother', 'brand_id' => $brand5->id],
            ['name' => 'LH7_Brother', 'brand_id' => $brand5->id],
        ];

        foreach ($models as $modelData) {
            Modelo::create($modelData);
        }
    }
}
