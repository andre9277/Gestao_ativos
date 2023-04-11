<?php

namespace Database\Seeders;

use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Unit::insert([
            ['name' => 'USF Entre Homem e Cávado', 'unit_contact' => 'usf.ehomemcavado@arsnorte.min-saude.pt', 'unit_address' => 'Amares', 'ent_id' => '3'],
            ['name' => 'USF AmareSaúde', 'unit_contact' => 'usf.amaresaude@arsnorte.min-saude.pt', 'unit_address' => 'Amares', 'ent_id' => '3'],
            ['name' => 'UCC Amares', 'unit_contact' => 'ucc.amares@arsnorte.min-saude.pt', 'unit_address' => 'Amares', 'ent_id' => '3'],
            ['name' => 'USF Maria da Fonte', 'unit_contact' => 'usf.mariafonte@arsnorte.min-saude.pt', 'unit_address' => 'Póvoa de Lanhoso', 'ent_id' => '3'],
            ['name' => 'USF das Terras de Lanhoso', 'unit_contact' => 'usf.terraslanhoso@arsnorte.min-saude.pt', 'unit_address' => 'Póvoa de Lanhoso', 'ent_id' => '3'],
            ['name' => 'UCC Coração do Minho', 'unit_contact' => 'ucc.coracaominho@arsnorte.min-saude.pt', 'unit_address' => 'Póvoa de Lanhoso', 'ent_id' => '3'],
            ['name' => 'USF Terras de Bouro', 'unit_contact' => 'ucsp.terrasbouro@arsnorte.min-saude.pt', 'unit_address' => 'Terras de Bouro', 'ent_id' => '3'],
            ['name' => 'UCC Terras de Bouro', 'unit_contact' => 'ucc.terrasbouro@arsnorte.min-saude.pt', 'unit_address' => 'Terras de Bouro', 'ent_id' => '3'],
            ['name' => 'UCC do Cávado e do Ave II', 'unit_contact' => 'ucc.cavadoaveII@arsnorte.min-saude.pt', 'unit_address' => 'Vieira do Minho', 'ent_id' => '3'],
            ['name' => 'UCSP Vieira do Minho', 'unit_contact' => 'ucsp.vieiraminho@arsnorte.min-saude.pt', 'unit_address' => 'Vieira do Minho', 'ent_id' => '3'],

            ['name' => 'UCC Vila Verde', 'unit_contact' => 'ucc.vilaverde@arsnorte.min-saude.pt', 'unit_address' => 'Vila Verde', 'ent_id' => '3'],
            ['name' => 'USF Pró-Saúde', 'unit_contact' => 'usf.prosaude@arsnorte.min-saude.pt', 'unit_address' => 'Vila Verde', 'ent_id' => '3'],
            ['name' => 'USF Sá de Miranda', 'unit_contact' => 'usf.samiranda@arsnorte.min-saude.pt', 'unit_address' => 'Vila Verde', 'ent_id' => '3'],
            ['name' => 'USF Vida+', 'unit_contact' => 'usfvidamais@arsnorte.min-saude.pt', 'unit_address' => 'Vila Verde', 'ent_id' => '3'],
            ['name' => 'USF Prado', 'unit_contact' => 'usf.prado@arsnorte.min-saude.pt', 'unit_address' => 'Vila Verde', 'ent_id' => '3'],
            ['name' => 'UCSP Terra Verde', 'unit_contact' => 'ucsp.portelavade@arsnorte.min-saude.pt', 'unit_address' => 'Vila Verde', 'ent_id' => '3'],
            ['name' => 'Unidade de Saúde Pública', 'unit_contact' => 'usp.gerescabreira@arsnorte.min-saude.pt', 'unit_address' => 'Saúde Pública', 'ent_id' => '3'],
            ['name' => 'Recursos Assistenciais Partilhados', 'unit_contact' => '253 909 230', 'unit_address' => 'Recursos Assistenciais Partilhados', 'ent_id' => '3'],
            ['name' => 'Equipa Coordenadora Local', 'unit_contact' => '253 909 230', 'unit_address' => 'Equipa Coordenadora Local', 'ent_id' => '3'],

        ]);
    }
}
