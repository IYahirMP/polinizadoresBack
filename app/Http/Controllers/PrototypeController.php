<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PrototypeController extends Controller
{
    protected $speciesData;

    public function __construct()
    {
        $species = '
        [
        {"id":"1", "species":"Danaus plexippus", "description": "Very large, with FW long and drawn out. Above, bright, burnt-orange with black veins and black margins sprinkled with white dots; FW tip broadly black interrupted by larger white and orange spots. Below, paler, duskier orange. 1 black spot appears between HW cell and margin on male above and below. Female darker with black veins smudged.", "img":"'.url("/speciesImages/0010001.png").'"},
        {"id":"2", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/0020003.png") . '"},
        {"id":"3", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/0030001.png") . '"},
        {"id":"4", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg"). '"},
        {"id":"5", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg"). '"},
        {"id":"6", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg"). '"},
        {"id":"7", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg"). '"},
        {"id":"8", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg"). '"},
        {"id":"9", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg"). '"},
        {"id":"10", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg").'"},
        {"id":"11", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg").'"},
        {"id":"12", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg").'"},
        {"id":"13", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg").'"},
        {"id":"14", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg").'"},
        {"id":"15", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg").'"},
        {"id":"16", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg").'"},
        {"id":"17", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg").'"},
        {"id":"18", "species":"Genero Especie", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in.", "img":"'. url("/speciesImages/Lepidoptera.jpg").'"}
        ]
        ';

        $this->speciesData = json_decode($species);
    }

    public function getImage($filename)
    {
        $path = public_path('images/' . $filename);

        if (!file_exists($path)) {
            return response()->json(['error' => 'Image not found.'], 404);
        }

        return response()->file($path);
    }

    public function getSpecies(Request $request)
    {
        $page = $request->input('_page', 1);
        $perPage = $request->input('_per_page', 10);

        // Calculate the offset for pagination
        $offset = ($page - 1) * $perPage;

        // Paginate the species data
        $paginatedData = array_slice($this->speciesData, $offset, $perPage);

        return response()->json($paginatedData);
    }

    public function getFirstSpecies(Request $request)
    {
        $paginatedData = array_slice($this->speciesData, 0, 1);

        return response()->json($paginatedData);
    }

    public function getSpeciesImages()
    {
        $imageFilenames = [
            '0010001.png',
            '0010002.png',
            '0010004.png',
            '0010005.png',
            '0010006.png',
            '0010007.png',
            '0010008.png',
            '0010009.png',
            '0010010.png',
            '0010011.png',
            '0010012.png',
            '0010013.png',
            '0010014.png',
            '0010015.png',
        ];

        $speciesImages = [
            [
                "id" => "1",
                "species" => "Danaus plexippus",
                "img" => array_map(fn($filename) => url("/speciesImages/{$filename}"), $imageFilenames)
            ]
        ];

        return response()->json($speciesImages);
    }



    public function getGraphByMonthSingleSpecies()
    {
        $graphByMonthSingleSpecies = [
            [
                "id" => "1",
                "year" => "2024",
                "months" => [
                    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                ],
                "data" => [100, 100, 100, 150, 170, 200, 250, 220, 200, 150, 125, 100]
            ]
        ];

        return response()->json($graphByMonthSingleSpecies);
    }


    public function getClassification()
    {
        $classification = [
            [
                "id" => "1",
                "domain" => "Eukaryota",
                "kingdom" => "Animalia",
                "phylum" => "Arthropoda",
                "class" => "Insecta",
                "order" => "Lepidoptera",
                "family" => "Nymphalidae",
                "genus" => "Danaus",
                "species" => "Danaus plexippus"
            ]
        ];

        return response()->json($classification);
    }
}
