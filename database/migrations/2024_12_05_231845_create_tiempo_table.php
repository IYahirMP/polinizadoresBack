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
        Schema::create('tiempo', function (Blueprint $table) {
            $table->id('id_tiempo');
            $table->unsignedSmallInteger('año');
            $table->unsignedTinyInteger('mes');
            $table->unsignedTinyInteger('semana');
            $table->unsignedTinyInteger('dia');
            $table->unsignedTinyInteger('hora');
            $table->unsignedTinyInteger('minuto');
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
