<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens; // Pour la gestion des tokens

class Client extends Authenticatable
{
    use HasApiTokens; // Utilisation du trait pour la gestion des tokens

    /**
     * Nom de la table associée au modèle.
     *
     * @var string
     */
    protected $table = 'clients';

    /**
     * Les attributs qui peuvent être assignés en masse.
     *
     * @var array
     */
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
    ];

    /**
     * Les attributs qui doivent être masqués lors de la sérialisation.
     *
     * @var array
     */
    protected $hidden = [
        'password', // Masquer le mot de passe
    ];

    /**
     * Définition de la relation avec la table "reservations".
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'id_client');
    }
}