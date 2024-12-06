<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tiempo;
use App\Models\Lugar;
use App\Models\BloqueTaxonomico;
use App\Models\Especie;
use App\Models\EspecieBloque;
use App\Models\Observaciones;
use App\Models\Imagen;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Poblar la tabla 'Tiempo'
        $tiempos = Tiempo::factory()->count(10)->create();

        // Poblar la tabla 'Lugar'
        $lugares = Lugar::factory()->count(5)->create();

        // Poblar la tabla 'BloqueTaxonomico'
        $bloquesPadre = BloqueTaxonomico::factory()->count(3)->create(); // Bloques raíz
        $bloquesHijos = BloqueTaxonomico::factory()->count(6)->create([
            'id_bloque_padre' => $bloquesPadre->random()->id,
        ]);

        // Poblar la tabla 'Especie'
        $especies = Especie::factory()->count(10)->create();

        // Poblar la tabla 'EspecieBloque'
        foreach ($especies as $especie) {
            EspecieBloque::factory()->create([
                'id_especie' => $especie->id,
                'id_bloque' => $bloquesHijos->random()->id,
            ]);
        }

        // Poblar la tabla 'Observaciones'
        foreach ($especies as $especie) {
            Observaciones::factory()->create([
                'id_especie' => $especie->id,
                'id_lugar' => $lugares->random()->id,
            ]);
        }

        // Poblar la tabla 'Imagen'
        foreach ($especies as $especie) {
            Imagen::factory()->create([
                'id_especie' => $especie->id,
            ]);
        }
    }
}
