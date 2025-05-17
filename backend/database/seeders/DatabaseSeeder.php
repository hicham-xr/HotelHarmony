<?php

use Illuminate\Database\Seeder;
use App\Models\Admin;
use App\Models\Client;
use App\Models\Chambre;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Admin::create([
            'prenom' => 'Admin',
            'nom' => 'Principal',
            'email' => 'hicham@admin.com',
            'password' => bcrypt('ppp0123'),
        ]);

        Client::create([
            'prenom' => 'client1',
            'nom' => 'ss1',
            'email' => 'client@hotel.com',
            'password' => bcrypt('password123'),
        ]);

        Chambre::create([
            'nom' => 'Chambre Deluxe',
            'description' => 'Chambre spacieuse avec vue sur la mer',
            'prix' => 150.00,
            'type' => 'Deluxe',
            'nbMaxPersonne' => 2,
            'id_admin' => 1,
            'etat' => true,
            'photo' => 'deluxe.jpg',
            
        ]);
    }
}