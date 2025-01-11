<?php

namespace App\Http\Controllers;

use App\Models\EspecieBloque;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

class EspecieBloqueController extends Controller
{
    public function index()
    {
        return response()->json(EspecieBloque::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_especie' => 'required|exists:especie,id',
            'id_bloque' => 'required|exists:bloquetaxonomico,id',
        ]);

        $especieBloque = EspecieBloque::create($validated);
        return response()->json($especieBloque, 201);
    }

    public function show($id)
    {
        $especieBloque = EspecieBloque::findOrFail($id); // Or find($id) with error handling

        return response()->json($especieBloque);
    }

    public function destroy(EspecieBloque $especieBloque)
    {
        $especieBloque->delete();
        return response()->json(null, 204);
    }
}
