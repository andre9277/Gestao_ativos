<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(30)->create();

        \App\Models\User::factory()->create([
            'name' => 'admin',
            'mec' => '00001',
            'mec' => '00001',
            'email' => 'mepleasebro@gmail.com',
            'password' => Hash::make('Admin@277'),
            'role_id' => 1
        ]);
    }
}
