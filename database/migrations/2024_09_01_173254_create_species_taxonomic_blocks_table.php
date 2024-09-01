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
        Schema::create('species_taxonomic_blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('species_id')
                ->references('id')
                ->on('species')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreignId('taxonomic_block_id')
                ->references('id')
                ->on('taxonomic_blocks')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('species_taxonomic_blocks');
    }
};
