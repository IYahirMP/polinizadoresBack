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
            $table->id('id_bloque');
            $table->string('tipo_bloque');
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->foreignId('id_bloque_padre')->nullable()->constrained('bloque_taxonomico', 'id_bloque');
            $table->timestamps();
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
