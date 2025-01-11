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
        Schema::create('observacion', function (Blueprint $table) {
            $table->id('id_observacion');
            $table->foreignId('id_especie')->constrained('especie', 'id_especie');
            $table->dateTime('inicio_deteccion');
            $table->dateTime('fin_deteccion')->nullable();
            $table->integer('duracion_deteccion')->nullable();
            $table->foreignId('id_lugar')->constrained('lugar', 'id_lugar');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('observacion');
    }
};
