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
        Schema::create('especie_imagen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('especie_id')
                ->constrained('especie')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('imagen_id')
                ->constrained('imagen')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('especie_imagen');
    }
};
