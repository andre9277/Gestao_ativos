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
            'mec' => 'b00001',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('Admin@277'),
            'pin' => Hash::make('111111'),
            'role_id' => 1
        ]);
    }
}
