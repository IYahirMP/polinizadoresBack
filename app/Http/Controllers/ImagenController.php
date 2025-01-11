<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagenController
{
    public function index()
    {
        return response()->json(Imagen::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_especie' => 'required|exists:especie,id',
            'imagen' => 'required|file|image|max:2048', // Máximo 2 MB
        ]);

        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('imagenes', 'public'); // Almacena en storage/app/public/imagenes
            $validated['imagen'] = $path;
        }

        $imagen = Imagen::create($validated);
        return response()->json($imagen, 201);
    }

    public function show($imagen)
    {
        return redirect(asset("species/0010001.png"));
    }

    public function update(Request $request, Imagen $imagen)
    {
        $validated = $request->validate([
            'id_especie' => 'exists:especie,id',
            'imagen' => 'file|image|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            // Elimina la imagen anterior
            if ($imagen->imagen && Storage::disk('public')->exists($imagen->imagen)) {
                Storage::disk('public')->delete($imagen->imagen);
            }

            $path = $request->file('imagen')->store('imagenes', 'public');
            $validated['imagen'] = $path;
        }

        $imagen->update($validated);
        return response()->json($imagen, 200);
    }

    public function destroy(Imagen $imagen)
    {
        // Elimina la imagen física del almacenamiento
        if ($imagen->imagen && Storage::disk('public')->exists($imagen->imagen)) {
            Storage::disk('public')->delete($imagen->imagen);
        }

        $imagen->delete();
        return response()->json(null, 204);
    }
}
