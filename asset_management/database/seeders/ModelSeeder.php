<?php

namespace Database\Seeders;

use App\Models\Modelo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class ModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Modelo::insert([
            ['name' => 'JCN23', 'brand_id' => '1'],
            ['name' => 'LJ129', 'brand_id' => '2'],
            ['name' => 'K5N3', 'brand_id' => '1']
        ]);
    }
}
