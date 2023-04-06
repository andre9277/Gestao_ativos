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
            ['ent_name' => 'Hospital de Braga', 'ent_type' => 'Interno'],
            ['ent_name' => 'ACeS Cávado I - Braga', 'ent_type' => 'Externo'],
            ['ent_name' => 'ACeS Cávado II - Gerês / Cabreira', 'ent_type' => 'Externo'],
            ['ent_name' => 'Unidade de Cirurgia Externa', 'ent_type' => 'Externo']
        ]);
    }
}
