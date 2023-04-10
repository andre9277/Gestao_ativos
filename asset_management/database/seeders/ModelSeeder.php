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
            ['model_name' => 'JCN23'],
            ['model_name' => 'LJ129'],
            ['model_name' => 'K5N3']
        ]);
    }
}
