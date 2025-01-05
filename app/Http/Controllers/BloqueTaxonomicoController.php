<?php

namespace App\Http\Controllers;

use App\Models\BloqueTaxonomico;
use Illuminate\Http\Request;

class BloqueTaxonomicoController
{
    public function index()
    {
        return response()->json(BloqueTaxonomico::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tipo_bloque' => 'required|string|max:255',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'id_bloque_padre' => 'nullable|exists:bloquetaxonomico,id',
        ]);

        $bloque = BloqueTaxonomico::create($validated);
        return response()->json($bloque, 201);
    }

    public function show($bloqueTaxonomico)
    {
        return response()->json(BloqueTaxonomico::where('id_bloque', $bloqueTaxonomico)->firstOrFail(), 200);
    }

    public function update(Request $request, BloqueTaxonomico $bloqueTaxonomico)
    {
        $validated = $request->validate([
            'tipo_bloque' => 'string|max:255',
            'nombre' => 'string|max:255',
            'descripcion' => 'nullable|string',
            'id_bloque_padre' => 'nullable|exists:bloquetaxonomico,id',
        ]);

        $bloqueTaxonomico->update($validated);
        return response()->json($bloqueTaxonomico, 200);
    }

    public function destroy(BloqueTaxonomico $bloqueTaxonomico)
    {
        $bloqueTaxonomico->delete();
        return response()->json(null, 204);
    }
}
