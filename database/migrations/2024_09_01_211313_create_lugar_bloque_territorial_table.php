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
        Schema::create('lugar_bloque_territorial', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lugar_id')
                ->references('id')
                ->on('lugar')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreignId('bloque_territorial_id')
                ->references('id')
                ->on('bloque_territorial')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lugar_bloque_territorial');
    }
};
