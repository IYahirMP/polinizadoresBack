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
        Schema::create('lugar', function (Blueprint $table) {
            $table->id('id_lugar');
            $table->string('enlace_maps')->nullable();
            $table->decimal('altitud', 10, 6);
            $table->decimal('longitud', 10, 6);
            $table->string('nombre');
            $table->string('estado');
            $table->string('municipio');
            $table->text('referencias')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lugar');
    }
};
