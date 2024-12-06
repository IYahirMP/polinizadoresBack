<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class BloqueTaxonomicoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tipo_bloque' => $this->faker->randomElement(['Reino', 'Filo', 'Clase', 'Orden', 'Familia', 'Género', 'Especie']),
            'nombre' => $this->faker->word,
            'descripcion' => $this->faker->sentence,
            'id_bloque_padre' => null, // Esto puede ser ajustado dinámicamente en el Seeder
        ];
    }
}
