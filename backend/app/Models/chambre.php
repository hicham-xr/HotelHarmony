<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chambre extends Model
{
    protected $table = 'chambres'; // Nom de la table

    protected $fillable = [
        'nom',
        'description',
        'prix',
        'type',
        'nbMaxPersonne',
        'id_admin',
        'etat',
        'photo',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'id_chambre');
    }
    
    public function admin(){
        return $this->belongsTo(Admin::class, 'id_admin');
    }
}