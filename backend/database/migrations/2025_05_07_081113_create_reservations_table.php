<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->date('dateArrive');
            $table->date('dateDepart');
            $table->integer('nbPersonne');
            $table->foreignId('id_client')->constrained('clients')->onDelete('cascade');
            $table->foreignId('id_chambre')->constrained('chambres')->onDelete('cascade');
            $table->timestamps();
            $table->boolean('etat')->default(false);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};