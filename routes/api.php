<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TiempoController;
use App\Http\Controllers\BloqueTaxonomicoController;
use App\Http\Controllers\EspecieController;
use App\Http\Controllers\ObservacionesController;

Route::get('/bloquetaxonomico/search/{term}',[BloqueTaxonomicoController::class, 'search'])->name("bloquetaxonomico.search");
Route::get('/bloquetaxonomico/ancestors/{id}', [BloqueTaxonomicoController::class, 'ancestors'])->name('bloquetaxonomico.ancestors');
Route::get('/especie/search/{term}', [EspecieController::class, 'search'])->name('especie.search');
Route::get('/observaciones',[ObservacionesController::class, 'fetchObservations'])->name('api.observaciones.index');

Route::apiResource(name: 'tiempo', controller: TiempoController::class);
