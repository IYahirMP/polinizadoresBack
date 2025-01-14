<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('especie_bloque', function (Blueprint $table) {
            $table->id('id_especie_bloque');
            $table->foreignId('id_especie')->constrained('especie', 'id_especie')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignId('id_bloque')->constrained('bloque_taxonomico', 'id_bloque')->cascadeOnDelete()->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('especie_bloque');
    }
};
