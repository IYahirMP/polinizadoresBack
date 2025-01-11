<?php

namespace App\Http\Controllers;

use App\Models\Tiempo;
use Illuminate\Http\Request;

class TiempoController
{
    public function index()
    {
        return response()->json(Tiempo::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'año' => 'required|integer',
            'mes' => 'required|integer|between:1,12',
            'semana' => 'required|integer|between:1,52',
            'dia' => 'required|integer|between:1,31',
            'timestamp' => 'required|date',
        ]);

        $tiempo = Tiempo::create($validated);
        return response()->json($tiempo, 201);
    }

    public function show(Tiempo $tiempo)
    {
        return response()->json($tiempo, 200);
    }

    public function update(Request $request, Tiempo $tiempo)
    {
        $validated = $request->validate([
            'año' => 'integer',
            'mes' => 'integer|between:1,12',
            'semana' => 'integer|between:1,52',
            'dia' => 'integer|between:1,31',
            'timestamp' => 'date',
        ]);

        $tiempo->update($validated);
        return response()->json($tiempo, 200);
    }

    public function destroy(Tiempo $tiempo)
    {
        $tiempo->delete();
        return response()->json(null, 204);
    }
}
