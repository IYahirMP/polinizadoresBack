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
        Schema::create('taxonomic_blocks', function (Blueprint $table) {
            $table->id();
            $table->text('block_type');
            $table->text('block_name');
            $table->text('block_description');
            $table->foreignId('upper_block_id')
                ->nullable()
                ->references('id')
                ->on('taxonomic_blocks')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('taxonomic_blocks');
    }
};
