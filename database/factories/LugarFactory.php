<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class LugarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'enlace_maps' => $this->faker->url,
            'latitud' => $this->faker->latitude,
            'longitud' => $this->faker->longitude,
            'nombre' => $this->faker->city,
            'estado' => $this->faker->state,
            'municipio' => $this->faker->citySuffix,
            'referencias' => $this->faker->sentence,
        ];
    }
}
