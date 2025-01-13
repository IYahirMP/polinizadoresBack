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
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Poblar la tabla 'Tiempo'
        $tiempos = Tiempo::factory()->count(100)->create();

        // Poblar la tabla 'Lugar'
        $lugares = Lugar::factory()->count(50)->create();

        // Especie homo sapiens
        $taxonomy = [
            ['nombre' => 'Eukaryota', 'tipo_bloque' => 'Dominio', 'id_bloque_padre' => null],
            ['nombre' => 'Animalia', 'tipo_bloque' => 'Reino', 'id_bloque_padre' => 1],
            ['nombre' => 'Chordata', 'tipo_bloque' => 'Filo', 'id_bloque_padre' => 2],
            ['nombre' => 'Mammalia', 'tipo_bloque' => 'Clase', 'id_bloque_padre' => 3],
            ['nombre' => 'Primates', 'tipo_bloque' => 'Órden', 'id_bloque_padre' => 4],
            ['nombre' => 'Hominidae', 'tipo_bloque' => 'Familia', 'id_bloque_padre' => 5],
            ['nombre' => 'Homo', 'tipo_bloque' => 'Género', 'id_bloque_padre' => 6],
        ];

        // Insert data into the database
        foreach ($taxonomy as $taxon) {
            DB::table('bloque_taxonomico')->insert([
                'nombre' => $taxon['nombre'],
                'tipo_bloque' => $taxon['tipo_bloque'],
                'id_bloque_padre' => $taxon['id_bloque_padre'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $speciesId = DB::table('especie')->insertGetId([
            'nombre' => 'Homo sapiens',        // Scientific name
            'nombre_comun' => 'Human',         // Common name
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Step 2: Define the taxonomic blocks corresponding to Homo sapiens
        $taxonomicBlockIds = [
            1, // Eukaryota
            2, // Animalia
            3, // Chordata
            4, // Mammalia
            5, // Primates
            6, // Hominidae
            7, // Homo
        ];

        // Step 3: Insert the relationships into the `especie_bloque` table
        foreach ($taxonomicBlockIds as $blockId) {
            DB::table('especie_bloque')->insert([
                'id_especie' => $speciesId,
                'id_bloque' => $blockId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Poblar la tabla 'BloqueTaxonomico'
        $bloquesPadre = BloqueTaxonomico::factory()->count(30)->create(); // Bloques raíz
        $bloquesHijos = BloqueTaxonomico::factory()->count(60)->create([
            'id_bloque_padre' => $bloquesPadre->random()->id,
        ]);

        // Poblar la tabla 'Especie'
        $especies = Especie::factory()->count(100)->create();

        // Poblar la tabla 'EspecieBloque'
        foreach ($especies as $especie) {
            EspecieBloque::factory()->create([
                'id_especie' => $especie->id_especie,
                'id_bloque' => $bloquesHijos->random()->id_bloque,
            ]);
        }

        // Poblar la tabla 'Observaciones'
        foreach ($especies as $especie) {
            Observaciones::factory()->create([
                'id_especie' => $especie->id_especie,
                'id_lugar' => $lugares->random()->id_lugar,
            ]);
        }

        // Poblar la tabla 'Imagen'
        foreach ($especies as $especie) {
            Imagen::factory()->create([
                'id_especie' => $especie->id_especie,
            ]);
        }
    }
}
