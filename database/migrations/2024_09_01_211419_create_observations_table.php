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
        Schema::create('observations', function (Blueprint $table) {
            $table->id();
            $table->dateTime('detection_begin');
            $table->dateTime('detection_end');
            $table->time('detection_duration');
            $table->foreignId('time_id')
                ->references('id')
                ->on('times')
                ->onDelete('cascade')
                ->onUpdate('cascade');
           /* $table->foreignId('species_id')
                ->references('id')
                ->on('species')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreignId('place_id')
                ->references('id')
                ->on('places')
                ->onDelete('cascade')
                ->onUpdate('cascade');*/
            $table->timestamps();
        });

        /*Schema::table('times', function (Blueprint $table) {
            $table->foreignId('observation_id')
                ->references('id')
                ->on('observations')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });*/
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('observations');
    }
};
