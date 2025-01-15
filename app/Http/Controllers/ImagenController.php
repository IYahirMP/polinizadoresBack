<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use App\Models\Especie;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class ImagenController
{
    protected $assetDirectory = '/storage/app/public';

    public function index()
    {
        $imagenes = DB::table('imagen')
            ->join('especie','imagen.id_especie','=','especie.id_especie')
            ->select([
                'imagen.id_imagen as id_imagen',
                'especie.nombre as nombre',
            ])->get();

        return Inertia::render('Imagen/Index', [
            'imagenes' => $imagenes,
        ]);
    }


    public function show($id)
    {
        $imagen = Imagen::findOrFail($id);
        $especie = Especie::findOrFail($imagen->id_especie);

        return Inertia::render('Imagen/Show', [
            'imagen' => $imagen,
            'url' => $imagen->url,
            'especie' => $especie,
        ]);
    }

    public function edit($imagen){
        return Inertia::render('Imagen/Edit', [
            'id_imagen' => $imagen,
        ]);
    }

    public function create(){
        return Inertia::render('Imagen/Create', []);
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

    public function destroy($id)
    {
        $flash = array(
            "action" => 'destroy',
            "status" => 'ok',
            'text' => 'La imagen se eliminó correctamente',
        );

        try{
            $imagen = Imagen::findOrFail($id);
            Storage::disk('imagenes')->delete($imagen->ruta);
            $destroyed = Imagen::destroy($id);
        }catch(Exception $e){
            $flash['status'] = 'bad';
            $flash["text"] = 'No se pudo eliminar el taxón';

        }finally{
            return redirect()->action([ImagenController::class, 'index'])
                ->with('message', $flash);
        }
    }

    public function store(Request $request)
    {
        $flash = array(
            "action" => 'create',
            "status" => 'ok',
            'text' => 'La imagen se cargó correctamente',
        );

        $request->validate([
            'id_especie' => 'required|exists:especie,id_especie',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240', // Ensure the image is valid
            'description' => 'nullable|string|max:255',
        ]);

        // Handle the image upload
        if ($request->hasFile('image')) {
            // Store the image on disk
            try{
                $uuid = uuid_create();
                Storage::disk('imagenes')->put($uuid . '.jpg', $request->file('image')->getContent());
                $url = Storage::disk('imagenes')->url($uuid . '.jpg');

                // Create a new Image entry in the database
                $image = Imagen::create([
                    'url' => $url,
                    'ruta' => $uuid.'.jpg',
                    'descripcion' => $request->input('description'),
                    'id_especie' => $request->input('id_especie'),
                ]);
            }catch(Exception $e){
                $flash['status'] = 'bad';
                $flash["text"] = 'No se pudo almacenar la imagen.';
    
                return redirect()->action([ImagenController::class, 'index'])
                    ->with('message', $flash);
            }
        }
        // Redirect back with a success message
        return redirect()->action([ImagenController::class, 'index'])
                ->with('message', $flash);    
    }
}
