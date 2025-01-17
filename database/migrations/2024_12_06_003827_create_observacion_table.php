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
            $table->foreignId('inicio_deteccion')->constrained('tiempo', 'id_tiempo');
            $table->foreignId('fin_deteccion')->constrained('tiempo', 'id_tiempo');
            $table->decimal('duracion_deteccion', 8, 2);
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
