<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chambre extends Model
{
    protected $table = 'chambres';

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

    protected $appends = ['photo_url'];

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'id_chambre');
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'id_admin');
    }

    public function getPhotoUrlAttribute()
    {
        return $this->photo ? asset('storage/' . $this->photo) : null;
    }
}
