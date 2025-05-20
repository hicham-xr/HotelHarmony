<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'admin'; // Nom de la table

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];
}