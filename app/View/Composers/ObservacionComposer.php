<?php

namespace App\View\Composers;
use Illuminate\View\View;

class ObservacionComposer{
    public function compose(View $view){
        $view->with('prueba2', 'Este es una variable de prueba');
    }
}
