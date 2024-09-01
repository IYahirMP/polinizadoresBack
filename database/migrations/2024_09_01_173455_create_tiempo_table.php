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
            $table->id();
            $table->integer('año');
            $table->smallInteger('mes');
            $table->smallInteger('dia');
            $table->smallInteger('hora');
            $table->timestamp("momento_captura");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tiempo');
    }
};
