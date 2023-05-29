<?php

namespace Database\Seeders;

use App\Models\Asset;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Asset::create([
            'numb_inv' => '4005900443298',
            'date_purch' => '2023-05-26',
            'state' => 'Ativo',
            'numb_ser' => 'SER001',
            'cond' => 'Novo',
            'ala' => 'C',
            'floor' => '1',
            'ci' => 'CI0011',
            'brand_id' => 1,
            'cat_id' => 1,
            'supplier_id' => 241,
            'ent_id' => 1,
            'model_id' => 1,
        ]);
    }
}
