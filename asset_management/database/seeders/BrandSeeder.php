<?php

namespace Database\Seeders;

use App\Models\Brand;

use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Brand::insert([
            ['name' => 'Hewlett-Packard Development Company, L.P.', 'sig' => 'HP'],
            ['name' => 'ASUSTek Computer Inc. ', 'sig' => 'ASUS'],
            ['name' => 'Samsung ', 'sig' => 'Samsung']
        ]);
    }
}
