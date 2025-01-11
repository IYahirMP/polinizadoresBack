<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SpeciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insert taxonomic classification first
        $kingdomAnimaliaId = DB::table('taxonomic_blocks')->insertGetId([
            'block_type' => 'Kingdom',
            'block_name' => 'Animalia',
            'block_description' => 'Animals',
            'upper_block_id' => null,
        ]);

        $phylumChordataId = DB::table('taxonomic_blocks')->insertGetId([
            'block_type' => 'Phylum',
            'block_name' => 'Chordata',
            'block_description' => 'Vertebrates',
            'upper_block_id' => $kingdomAnimaliaId,
        ]);

        $classMammaliaId = DB::table('taxonomic_blocks')->insertGetId([
            'block_type' => 'Class',
            'block_name' => 'Mammalia',
            'block_description' => 'Mammals',
            'upper_block_id' => $phylumChordataId,
        ]);

        $classAvesId = DB::table('taxonomic_blocks')->insertGetId([
            'block_type' => 'Class',
            'block_name' => 'Aves',
            'block_description' => 'Birds',
            'upper_block_id' => $phylumChordataId,
        ]);

        // Insert species along with their specific taxonomy

        // Example: Polar Bear
        $orderCarnivoraId = DB::table('taxonomic_blocks')->insertGetId([
            'block_type' => 'Order',
            'block_name' => 'Carnivora',
            'block_description' => 'Carnivores',
            'upper_block_id' => $classMammaliaId,
        ]);

        $familyUrsidaeId = DB::table('taxonomic_blocks')->insertGetId([
            'block_type' => 'Family',
            'block_name' => 'Ursidae',
            'block_description' => 'Bears',
            'upper_block_id' => $orderCarnivoraId,
        ]);

        $genusUrsusId = DB::table('taxonomic_blocks')->insertGetId([
            'block_type' => 'Genus',
            'block_name' => 'Ursus',
            'block_description' => 'True Bears',
            'upper_block_id' => $familyUrsidaeId,
        ]);

        DB::table('species')->insert([
            'common_name' => 'Polar Bear',
        ]);

        DB::table('taxonomic_blocks')->insert([
            'block_type' => 'Species',
            'block_name' => 'Ursus maritimus',
            'block_description' => 'Polar Bear',
            'upper_block_id' => $genusUrsusId,
        ]);

        // Example: Bald Eagle
        $orderAccipitriformesId = DB::table('taxonomic_blocks')->insertGetId([
            'block_type' => 'Order',
            'block_name' => 'Accipitriformes',
            'block_description' => 'Birds of prey',
            'upper_block_id' => $classAvesId,
        ]);

        $familyAccipitridaeId = DB::table('taxonomic_blocks')->insertGetId([
            'block_type' => 'Family',
            'block_name' => 'Accipitridae',
            'block_description' => 'Eagles and hawks',
            'upper_block_id' => $orderAccipitriformesId,
        ]);

        $genusHaliaeetusId = DB::table('taxonomic_blocks')->insertGetId([
            'block_type' => 'Genus',
            'block_name' => 'Haliaeetus',
            'block_description' => 'Sea Eagles',
            'upper_block_id' => $familyAccipitridaeId,
        ]);

        DB::table('species')->insert([
            'common_name' => 'Bald Eagle',
        ]);

        DB::table('taxonomic_blocks')->insert([
            'block_type' => 'Species',
            'block_name' => 'Haliaeetus leucocephalus',
            'block_description' => 'Bald Eagle',
            'upper_block_id' => $genusHaliaeetusId,
        ]);

        // Add more species with their taxonomy
        $this->insertSpeciesWithTaxonomy(
            'Red Fox',
            'Carnivora', 'Canidae', 'Vulpes', 'Vulpes vulpes',
            $classMammaliaId
        );

        $this->insertSpeciesWithTaxonomy(
            'Gray Wolf',
            'Carnivora', 'Canidae', 'Canis', 'Canis lupus',
            $classMammaliaId
        );

        $this->insertSpeciesWithTaxonomy(
            'Blue Whale',
            'Cetacea', 'Balaenopteridae', 'Balaenoptera', 'Balaenoptera musculus',
            $classMammaliaId
        );

        $this->insertSpeciesWithTaxonomy(
            'Giant Panda',
            'Carnivora', 'Ursidae', 'Ailuropoda', 'Ailuropoda melanoleuca',
            $classMammaliaId
        );

        $this->insertSpeciesWithTaxonomy(
            'King Penguin',
            'Sphenisciformes', 'Spheniscidae', 'Aptenodytes', 'Aptenodytes patagonicus',
            $classAvesId
        );

        $this->insertSpeciesWithTaxonomy(
            'Green Sea Turtle',
            'Testudines', 'Cheloniidae', 'Chelonia', 'Chelonia mydas',
            $phylumChordataId
        );

        $this->insertSpeciesWithTaxonomy(
            'Snow Leopard',
            'Carnivora', 'Felidae', 'Panthera', 'Panthera uncia',
            $classMammaliaId
        );
    }

    /**
     * Helper function to insert species with its taxonomic hierarchy.
     */
    private function insertSpeciesWithTaxonomy(
        string $commonName,
        string $order,
        string $family,
        string $genus,
        string $species,
        int $classId
    ): void {
        $orderId = DB::table('taxonomic_blocks')->insertGetId([
            'block_type' => 'Order',
            'block_name' => $order,
            'block_description' => $order,
            'upper_block_id' => $classId,
        ]);

        $familyId = DB::table('taxonomic_blocks')->insertGetId([
            'block_type' => 'Family',
            'block_name' => $family,
            'block_description' => $family,
            'upper_block_id' => $orderId,
        ]);

        $genusId = DB::table('taxonomic_blocks')->insertGetId([
            'block_type' => 'Genus',
            'block_name' => $genus,
            'block_description' => $genus,
            'upper_block_id' => $familyId,
        ]);

        DB::table('species')->insert([
            'common_name' => $commonName,
        ]);

        DB::table('taxonomic_blocks')->insert([
            'block_type' => 'Species',
            'block_name' => $species,
            'block_description' => $commonName,
            'upper_block_id' => $genusId,
        ]);
    }
}
