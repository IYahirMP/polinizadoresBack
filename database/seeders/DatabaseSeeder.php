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
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
            ['nombre' => 'Eukaryota', 'tipo_bloque' => 'Dominio', 'id_bloque_padre' => null, 'descripcion' => "Una descripcion"],
            ['nombre' => 'Animalia', 'tipo_bloque' => 'Reino', 'id_bloque_padre' => 1, 'descripcion' => "Una descripcion"],
            ['nombre' => 'Chordata', 'tipo_bloque' => 'Filo', 'id_bloque_padre' => 2, 'descripcion' => "Una descripcion"],
            ['nombre' => 'Mammalia', 'tipo_bloque' => 'Clase', 'id_bloque_padre' => 3, 'descripcion' => "Una descripcion"],
            ['nombre' => 'Primates', 'tipo_bloque' => 'Órden', 'id_bloque_padre' => 4, 'descripcion' => "Una descripcion"],
            ['nombre' => 'Hominidae', 'tipo_bloque' => 'Familia', 'id_bloque_padre' => 5, 'descripcion' => "Una descripcion"],
            ['nombre' => 'Homo', 'tipo_bloque' => 'Género', 'id_bloque_padre' => 6, 'descripcion' => "Una descripcion"],
        ];

        // Insert data into the database
        foreach ($taxonomy as $taxon) {
            DB::table('bloque_taxonomico')->insert([
                'nombre' => $taxon['nombre'],
                'tipo_bloque' => $taxon['tipo_bloque'],
                'id_bloque_padre' => $taxon['id_bloque_padre'],
                'created_at' => now(),
                'updated_at' => now(),
                'descripcion' => $taxon['descripcion'],
            ]);
        }

        $speciesId = DB::table('especie')->insertGetId([
            'nombre' => 'Homo sapiens',        // Scientific name
            'nombre_comun' => 'Human',         // Common name
            'descripcion' => 'Seres humanos',
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

        $imgTestFolder = Storage::files('public/speciesimages/test');
        
        $rutas = [];
        foreach($imgTestFolder as $r){
            $rutas[] = str_replace("public/speciesimages/", "", $r);
        }
    
        // Poblar la tabla 'Imagen'
        $i = 0;
        $faker = \Faker\Factory::create();

        foreach ($especies as $especie) {
            Imagen::factory()->create([
                'id_especie' => $especie->id_especie,
                'ruta' => $rutas[$i],
                'url' => Storage::disk('imagenes')->url($rutas[$i]),
                'descripcion' => $faker->text(160)
            ]);

            $i++;
            if ($i == count($rutas)){
                $i = 0;
            }
        }
    }
}
