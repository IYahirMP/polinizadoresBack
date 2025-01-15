<?php

use App\Http\Controllers\ProfileController;
use App\Models\Especie;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $ok = true;

    try{
        $especies = DB::table('especie')
        ->join('imagen','especie.id_especie','=','imagen.id_especie')
        ->select([
            'especie.id_especie as id_especie',
            'especie.nombre as nombre',
            'especie.descripcion as descripcion',
            'imagen.url as url',
            ])
        ->get();
    }catch(Exception $e){
        $ok = false;
    }finally{
        return Inertia::render('Gallery/Gallery', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'especies' => $especies,
            'requestOk' => $ok,
        ]);
    }
})->name('galeria.index');

Route::get('/galeria/{id}', function ($id){
    $especie = Especie::findOrFail($id);

    return Inertia::render('SpeciesDetail/SpeciesDetail', [
        'especie' => $especie,
    ]);
})->name('galeria.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

use App\Http\Controllers\BloqueTaxonomicoController;
use App\Http\Controllers\EspecieBloqueController;
use App\Http\Controllers\EspecieController;
use App\Http\Controllers\ImagenController;
use App\Http\Controllers\LugarController;
use App\Http\Controllers\ObservacionesController;
use App\Http\Controllers\TiempoController;


Route::resource('bloquetaxonomico', BloqueTaxonomicoController::class)->middleware('auth');
Route::get('/bloquetaxonomico/search/{term}',[BloqueTaxonomicoController::class, 'search'])->name("bloquetaxonomico.search")->middleware('auth');
Route::get('/bloquetaxonomico/ancestors/{id}', [BloqueTaxonomicoController::class, 'ancestors'])->name('bloquetaxonomico.ancestors')->middleware('auth');

Route::resource('especiebloque', controller: EspecieBloqueController::class)->middleware('auth');
Route::resource('especie', controller: EspecieController::class)->middleware('auth');
Route::get('/especie/search/{term}', [EspecieController::class, 'search'])->name('especie.search')->middleware('auth');

Route::resource('imagen', controller: ImagenController::class)->middleware('auth');
Route::resource('lugar', controller: LugarController::class)->middleware('auth');
Route::resource('observaciones', controller: ObservacionesController::class)->middleware('auth');
Route::resource('tiempo', controller: TiempoController::class)->middleware('auth');
