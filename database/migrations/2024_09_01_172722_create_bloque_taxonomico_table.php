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
        Schema::create('bloque_taxonomico', function (Blueprint $table) {
            $table->id();
            $table->text('tipo_bloque');
            $table->text('nombre_bloque');
            $table->text('descripcion_bloque');
            $table->foreignId('id_bloque_superior')
                ->nullable()
                ->references('id')
                ->on('bloque_taxonomico')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bloque_taxonomico');
    }
};
