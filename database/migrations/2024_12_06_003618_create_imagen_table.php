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
        Schema::create('imagen', function (Blueprint $table) {
            $table->id('id_imagen');
            $table->foreignId('id_especie')->constrained('especie', 'id_especie')
                ->cascadeOnDelete()->cascadeOnUpdate();
            $table->string("url");
            $table->string('ruta');
            $table->string('descripcion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imagen');
    }
};
