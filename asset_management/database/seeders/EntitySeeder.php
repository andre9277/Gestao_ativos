<?php

namespace Database\Seeders;

use App\Models\Entity;
use Illuminate\Database\Seeder;

class EntitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Entity::insert([
            ['name' => 'Hospital de Braga', 'ent_type' => 'Interno'],
            ['name' => 'ACeS Cávado I - Braga', 'ent_type' => 'Externo'],
            ['name' => 'ACeS Cávado II - Gerês / Cabreira', 'ent_type' => 'Externo'],
            ['name' => 'Unidade de Cirurgia Externa', 'ent_type' => 'Externo']
        ]);
    }
}
