<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chambres', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->text('description');
            $table->decimal('prix', 8, 2);
            $table->string('type');
            $table->integer('nbMaxPersonne');
            $table->timestamps();
            $table->foreignId('id_admin')->constrained('admin')->onDelete('cascade');
            $table->boolean('etat')->default(false); // false = non confirmée, true = confirmée
            $table->string('photo');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chambres');
    }
};