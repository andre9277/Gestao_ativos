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

            ['name' => 'USF Braga Norte', 'unit_contact' => 'usf.braganorte@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF 7 Fontes', 'unit_contact' => 'usf.setefontes@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF Ruães', 'unit_contact' => 'usf.ruaes@arsnorte.min-saude.pt', 'unit_address' => 'Mire de Tibães', 'ent_id' => '2'],
            ['name' => 'USF do Minho', 'unit_contact' => 'usf.minho@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF Sanus Caranda', 'unit_contact' => 'usf.sanuscaranda@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF S. João de Braga', 'unit_contact' => 'usf.pelaezcarones@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF Salutis', 'unit_contact' => 'usf.salutis@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF + Carandá', 'unit_contact' => 'usfcaranda@csbraga1.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF Bracara Augusta', 'unit_contact' => 'usf.bracaraaugusta@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF Gualtar', 'unit_contact' => 'usf.gualtar@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF Manuel Rocha Peixoto', 'unit_contact' => 'usf.mrpeixoto@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF Maxisaúde', 'unit_contact' => 'usf.maxisaude@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF São Lourenço', 'unit_contact' => 'usf.slourenco@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF Saúde Oeste', 'unit_contact' => 'usf.saudeoeste@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF Tadim', 'unit_contact' => 'usf.tadim@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USF Esporões', 'unit_contact' => 'usf.esporoes@arsnorte.min-saude.pt', 'unit_address' => 'Esporões', 'ent_id' => '2'],
            ['name' => 'USF São Salvador', 'unit_contact' => 'usf.saosalvador@arsnorte.min-saude.pt', 'unit_address' => 'Tebosa', 'ent_id' => '2'],
            ['name' => 'US Braga', 'unit_contact' => '', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'UCSP Adaúfe', 'unit_contact' => 'ucsp.adaufe@arsnorte.min-saude.pt', 'unit_address' => 'Adaúfe', 'ent_id' => '2'],
            ['name' => 'UCC Assucena Lopes Teixeira', 'unit_contact' => 'ucc.alopesteixeira@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'UCC Braga Saudável', 'unit_contact' => 'ucc.bragasaudavel@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'UCC Colina', 'unit_contact' => 'ucc.colina@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'URAP Braga', 'unit_contact' => 'urap.braga@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],
            ['name' => 'USP Braga', 'unit_contact' => 'usp.braga@arsnorte.min-saude.pt', 'unit_address' => 'Braga', 'ent_id' => '2'],

        ]);
    }
}
