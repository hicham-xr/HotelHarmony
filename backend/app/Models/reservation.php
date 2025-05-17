<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $table = 'reservations'; // Nom de la table

    protected $fillable = [
        'dateArrive',
        'dateDepart',
        'nbPersonne',
        'id_client',
        'id_chambre',
        'etat'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'id_client');
    }

    public function chambre()
    {
        return $this->belongsTo(Chambre::class, 'id_chambre');
    }
}