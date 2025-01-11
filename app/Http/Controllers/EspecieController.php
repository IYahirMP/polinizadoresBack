<?php

namespace App\Http\Controllers;

use App\Models\Especie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class EspecieController
{
    public function index()
    {
        return response()->json(Especie::all(), 200);
    }

    public function store(Request $request)
    {
        $especie = Especie::create([]);
        return response()->json($especie, 201);
    }

    public function show(Especie $especie)
    {
        return response()->json($especie, 200);
    }

    public function destroy(Especie $especie)
    {
        $especie->delete();
        return response()->json(null, 204);
    }
}
