<?php

namespace Database\Factories;

use App\Models\BloqueTaxonomico;
use App\Models\Especie;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class EspecieBloqueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_especie' => Especie::factory(),
            'id_bloque' => BloqueTaxonomico::factory(),
        ];
    }
}
