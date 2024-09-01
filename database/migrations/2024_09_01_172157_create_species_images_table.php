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
        Schema::create('species_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('species_id')
                ->references('id')
                ->on('species')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('image_id')
                ->references('id')
                ->on('images')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('species_images');
    }
};
