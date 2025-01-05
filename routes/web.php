<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

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


Route::apiResource('bloquetaxonomico', controller: BloqueTaxonomicoController::class);
Route::apiResource('especiebloque', controller: EspecieBloqueController::class);
Route::apiResource('especie', controller: EspecieController::class);
Route::apiResource('imagen', controller: ImagenController::class);
Route::apiResource('lugar', controller: LugarController::class);
Route::apiResource('observaciones', controller: ObservacionesController::class);
Route::apiResource('tiempo', controller: TiempoController::class);
