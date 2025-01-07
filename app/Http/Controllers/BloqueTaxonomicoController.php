<?php

namespace App\Http\Controllers;

use App\Models\BloqueTaxonomico;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BloqueTaxonomicoController extends Controller
{
    public function index()
    {
        $bloques = BloqueTaxonomico::with('parent')->get();
        return Inertia::render('BloqueTaxonomico/Index', [
            'bloques' => $bloques,
        ]);
    }

    public function create()
    {
        return Inertia::render('BloqueTaxonomico/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'tipo_bloque' => 'required|string|max:255',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'id_bloque_padre' => 'nullable|exists:bloque_taxonomico,id_bloque',
        ]);

        BloqueTaxonomico::create($request->all());
        return redirect()->route('bloquetaxonomico.index')->with('success', 'Bloque created successfully!');
    }

    public function edit(BloqueTaxonomico $bloque)
    {
        return Inertia::render('BloqueTaxonomico/Edit', [
            'bloque' => $bloque,
        ]);
    }

    public function update(Request $request, BloqueTaxonomico $bloque)
    {
        $request->validate([
            'tipo_bloque' => 'required|string|max:255',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'id_bloque_padre' => 'nullable|exists:bloque_taxonomico,id_bloque',
        ]);

        $bloque->update($request->all());
        return redirect()->route('bloquetaxonomico.index')->with('success', 'Bloque updated successfully!');
    }

    public function destroy(BloqueTaxonomico $bloque)
    {
        $bloque->delete();
        return redirect()->route('bloquetaxonomico.index')->with('success', 'Bloque deleted successfully!');
    }
}
