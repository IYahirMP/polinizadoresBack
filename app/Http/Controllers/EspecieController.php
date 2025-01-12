<?php

namespace App\Http\Controllers;

use App\Models\Especie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EspecieController
{
    public function store(Request $request)
    {
        $especie = Especie::create([]);
        return response()->json($especie, 201);
    }

    
    public function destroy(Especie $especie)
    {
        $especie->delete();
        return response()->json(null, 204);
    }
    
    // Retornan UI
    
    public function index()
    {
        $especies = Especie::all();
        return Inertia::render('Especie/Index', [
            'especies' => $especies,
        ]);
    }

    public function show($especie)
    {
        $especie = Especie::findOrFail($especie);
        $jerarquia = $especie->getOrderedHierarchy();
        $jerarquia[count($jerarquia)] = ["Especie", $especie->nombre];

        return Inertia::render('Especie/Show',[
            "especie" => $especie,
            "jerarquia" => $jerarquia,
        ]);
    }

    public function edit($id){
        $especie = Especie::findOrFail($id);

        return Inertia::render("Especie/Edit", [
            "especie" => $especie,
        ]);
    }

    public function create(){
        return Inertia::render("Especie/Crear");
    }
}
