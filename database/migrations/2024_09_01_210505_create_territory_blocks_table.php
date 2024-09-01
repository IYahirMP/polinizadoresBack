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
        Schema::create('territory_blocks', function (Blueprint $table) {
            $table->id();
            $table->string('block_name');
            $table->foreignId('upper_block_id')
                ->references('id')
                ->on('territory_blocks')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreignId('country_id')
                ->references('id')
                ->on('countries')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('territory_blocks');
    }
};
