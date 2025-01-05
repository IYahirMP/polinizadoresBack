<?php

namespace App\Http\Controllers;

use App\Models\Observaciones;
use Illuminate\Http\Request;

class ObservacionesController
{
    public function index()
    {
        return response()->json(Observaciones::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_especie' => 'required|exists:especie,id',
            'id_lugar' => 'required|exists:lugar,id',
            'inicio_deteccion' => 'required|date',
            'fin_deteccion' => 'required|date|after_or_equal:inicio_deteccion',
            'duracion_deteccion' => 'required|integer|min:0',
        ]);

        $observacion = Observaciones::create($validated);
        return response()->json($observacion, 201);
    }

    public function show(Observaciones $observacion)
    {
        return response()->json($observacion, 200);
    }

    public function update(Request $request, Observaciones $observacion)
    {
        $validated = $request->validate([
            'id_especie' => 'exists:especie,id',
            'id_lugar' => 'exists:lugar,id',
            'inicio_deteccion' => 'date',
            'fin_deteccion' => 'date|after_or_equal:inicio_deteccion',
            'duracion_deteccion' => 'integer|min:0',
        ]);

        $observacion->update($validated);
        return response()->json($observacion, 200);
    }

    public function destroy(Observaciones $observacion)
    {
        $observacion->delete();
        return response()->json(null, 204);
    }
}
