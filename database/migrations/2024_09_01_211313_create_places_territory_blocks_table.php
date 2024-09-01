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
        Schema::create('places_territory_blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('place_id')
                ->references('id')
                ->on('places')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreignId('territory_block_id')
                ->references('id')
                ->on('territory_blocks')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('places_territory_blocks');
    }
};
