<?php

namespace App\Http\Controllers;

use App\Models\Lugar;
use Illuminate\Http\Request;

class LugarController
{
    public function index()
    {
        return response()->json(Lugar::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'enlace_maps' => 'required|url',
            'altitud' => 'required|numeric',
            'longitud' => 'required|numeric',
            'nombre' => 'required|string|max:255',
            'estado' => 'required|string|max:255',
            'municipio' => 'required|string|max:255',
            'referencias' => 'nullable|string',
        ]);

        $lugar = Lugar::create($validated);
        return response()->json($lugar, 201);
    }

    public function show(Lugar $lugar)
    {
        return response()->json($lugar, 200);
    }

    public function update(Request $request, Lugar $lugar)
    {
        $validated = $request->validate([
            'enlace_maps' => 'url',
            'altitud' => 'numeric',
            'longitud' => 'numeric',
            'nombre' => 'string|max:255',
            'estado' => 'string|max:255',
            'municipio' => 'string|max:255',
            'referencias' => 'nullable|string',
        ]);

        $lugar->update($validated);
        return response()->json($lugar, 200);
    }

    public function destroy(Lugar $lugar)
    {
        $lugar->delete();
        return response()->json(null, 204);
    }
}
