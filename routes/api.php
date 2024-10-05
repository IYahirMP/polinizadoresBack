<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\PrototypeController;
use App\Models\Observation;

Route::get('/observations', function(){
    $observation = Observation::all();
    //return response()->json($observation);

    $observations = DB::table('observations')->get();

    $newArr = array();
    $keys = array('id' => 0, 'detection_duration' => 0, 'time_id' => 0);

    foreach($observations as $observation){
        foreach($observation as $key => $value) {
            if(key_exists($key, $keys)) {
                $newArr[$observation->id][$key] = $value;
            }
        }
    }

    //return DB::table("observations")->pluck("detection_duration", "detection_begin");


    /*return DB::table('observations')
                ->get()
                ->where('id', '>', 50)
                ->where('id','<', 60);*/

    /*DB::table('observations')
        ->orderBy('id')
        ->chunkById(100, function($observations){
            foreach($observations as $observation){
                echo "Detection duration: for id $observation->id is $observation->detection_duration <br>";
            }
        });*/


    /*$some = DB::table('observations')->get();
    echo "<pre>".print_r($some, true)."</pre>";*/

    /*$tCol = DB::table('observations');
    $max = $tCol->max('id');
    $min = $tCol->min('id');
    $avg = $tCol->avg('id');

    echo "Max es $max, Min es $min, y AVG es $avg";*/

    /*if(DB::table('observations')->where('id',3000000)->doesntExist()){
        echo "It doesnt exist";
    }else{
        echo "It exists";
    }*/

    return DB::select('SELECT id, detection_duration, time_id FROM observations');
});

/*Route::get('/species', function (Request $request) {
    $species = DB::select('select * from especie');
    return response()->json($species);
});*/

/*Route::get('/species/1', [PrototypeController::class, 'getFirstSpecies']);
Route::get('/species', [PrototypeController::class, 'getSpecies']);
Route::get('/species-images/1', [PrototypeController::class, 'getSpeciesImages']);
Route::get('/graph-by-month/1', [PrototypeController::class, 'getGraphByMonthSingleSpecies']);
Route::get('/classification/1', [PrototypeController::class, 'getClassification']);

// Nueva ruta para servir imágenes
Route::get('/images/{filename}', [PrototypeController::class, 'getImage']);*/
