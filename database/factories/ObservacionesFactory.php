<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ObservacionesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_especie' => \App\Models\Especie::factory(),
            'inicio_deteccion' => \App\Models\Tiempo::factory(),
            'fin_deteccion' => \App\Models\Tiempo::factory(),
            'duracion_deteccion' => $this->faker->numberBetween(1, 300),
            'id_lugar' => \App\Models\Lugar::factory(),
        ];
    }
}
