<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class TiempoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'año' => $this->faker->year,
            'mes' => $this->faker->numberBetween(1, 12),
            'semana' => $this->faker->numberBetween(1, 52),
            'dia' => $this->faker->numberBetween(1, 31),
            'timestamp' => $this->faker->dateTime,
        ];
    }
}
