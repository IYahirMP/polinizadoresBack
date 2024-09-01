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
        Schema::create('bloque_territorial', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->foreignId('id_bloque_superior')
                ->references('id')
                ->on('bloque_territorial')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreignId('id_pais')
                ->references('id')
                ->on('pais')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bloque_territorial');
    }
};
