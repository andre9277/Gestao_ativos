<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Seeder;

class SuppliersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Supplier::insert([
            ['id' => '241', 'name' => 'Whelta', 'email' => 'whelta@gmail.com', 'phone' => '253 832 905', 'address' => 'Av. Liberdade nº382, Portugal'],
            ['id' => '583', 'name' => 'Kugc', 'email' => 'kugc@hotmail.com', 'phone' => '253 291 192', 'address' => 'Rua Camoes nº23, Portugal'],
            ['id' => '743', 'name' => 'Mint', 'email' => 'mint@gmail.com', 'phone' => '253 812 853', 'address' => 'Praça da Repuplica nº842, Portugal'],
        ]);
    }
}
