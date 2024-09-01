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
        Schema::create('especie_bloque_taxonomico', function (Blueprint $table) {
            $table->id();
            $table->foreignId('especie_id')
                ->references('id')
                ->on('especie')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreignId('bloque_taxonomico_id')
                ->references('id')
                ->on('bloque_taxonomico')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('especie_bloque_taxonomico');
    }
};
