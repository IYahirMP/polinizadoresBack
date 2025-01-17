<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TiempoController;


Route::apiResource(name: 'tiempo', controller: TiempoController::class);
