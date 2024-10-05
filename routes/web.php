<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ObservationController;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return view('welcome');
});

$names = 'observation';
$ruta = 'observation';
$var_name = 'observation';

/*Route::resource($ruta, ObservationController::class)
    ->parameters([$ruta => $var_name])
    ->names($names);
*/

Route::controller(ObservationController::class)
    ->prefix($names)
    ->name($ruta)
    ->group(function () {

        Route::get('/', 'index')->name('index');
        Route::post('/', 'store')->name('store');
        Route::get('/{id}', 'show')->name('show');
        Route::put('/{id}', 'update')->name('update');
        Route::delete('/{id}', 'destroy')->name('destroy');
        Route::post('/{id}/editar', 'edit')->name('edit');
    });

Route::controller(AdminController::class)
    ->prefix('admin')
    ->name('admin')
    ->group(function () {
        Route::get('/', 'home')->name('home');
    });
