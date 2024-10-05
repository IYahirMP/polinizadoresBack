<?php

namespace Database\Seeders;

use App\Models\Observation;
use App\Models\Time;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Time::factory(100)->create()
            ->each(function (Time $time) {
                Observation::factory(1)->create([
                    'time_id' => $time->id
                ]);
            });

    }
}
