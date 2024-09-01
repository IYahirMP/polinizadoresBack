<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ObservacionController;

$names = 'observacion';
$ruta = 'observacion';
$var_name = 'observacion';

Route::controller(ObservacionController::class)
    ->prefix($names)
    ->name($ruta)
    ->group(function () {

        Route::get('/', 'index')->name('index');
        Route::get('/', 'store')->name('store');
        Route::get('/{id}', 'create')->name('create');
        Route::get('/{id}', 'show')->name('show');
        Route::put('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
        Route::post('/{observacion}/editar', 'edit')->name('edit');


});


Route::resource($ruta, ObservacionController::class)
    ->parameters([$ruta => $var_name])
    ->names($names);

Route::controller(ObservacionController::class)->group(function () {

});
