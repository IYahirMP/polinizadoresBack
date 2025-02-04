<?php

namespace App\Http\Controllers;

use App\Models\BloqueTaxonomico;
use App\Models\Especie;
use App\Models\Imagen;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EspecieController
{
    public function store(Request $request)
    {
        $flash = array(
            "action" => 'create',
            "status" => 'ok',
            'text' => 'La especie se creó correctamente',
        );

        $request->validate([
            'nombre_comun' => 'required|string|max:255',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
            'id_bloque_padre' => 'required|exists:bloque_taxonomico,id_bloque',
        ]);

        try{
            DB::beginTransaction();
            $especie = Especie::create($request->all());
            $this->vincularAncestros($request, $especie->id_especie);
            DB::commit();

        }catch(Exception $e){
            $flash['status'] = 'bad';
            $flash["text"] = 'No se pudo crear la especie';
            DB::rollBack();
        }finally{
            return redirect()->action([EspecieController::class, 'index'])
                ->with('message', $flash);
        }
    }

    
    public function destroy($especie)
    {
        $flash = array(
            "action" => 'destroy',
            "status" => 'ok',
            'text' => 'La especie se eliminó correctamente',
        );

        try{
            Especie::findOrFail($especie)->deleteOrFail();
        }catch(Exception $e){
            $flash['status'] = 'bad';
            $flash["text"] = 'No se pudo eliminar la especie';
        }finally{
            return redirect()->action([EspecieController::class, 'index'])
                ->with('message', $flash);
        }
    }

    public function update(Request $request, $id)
    {
        $flash = array(
            "action" => 'update',
            "status" => 'ok',
            'text' => 'La especie se actualizó correctamente',
        );

        $request->validate([
            'nombre_comun' => 'required|string|max:255',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string|max:255',
            'id_bloque_padre' => 'required|exists:bloque_taxonomico,id_bloque',
        ]);

        $especie = Especie::findOrFail($id);

        try{
            $especie->update([
                'nombre_comun' => $request->nombre_comun,
                'nombre' => $request->nombre,
                'descripcion' => $request->descripcion,
            ]);

            DB::table('especie_bloque')->where('id_especie','=', $id)->delete();
            $this->vincularAncestros($request, $id);
        }catch(Exception $e){
            $flash['status'] = 'bad';
            $flash['text'] = 'La especie no pudo actualizarse.';
        }finally{
            return redirect()->action([EspecieController::class, 'index'])
                ->with('message', $flash);
        }
    }

    public function vincularAncestros(Request $request, $id){
        $bloquePadre = BloqueTaxonomico::findOrFail($request->id_bloque_padre);
        $ancestros = $bloquePadre->getAncestors();

        foreach($ancestros as $ancestro){
            $values = [
                'id_especie' => $id,
                'id_bloque' => $ancestro->id_bloque,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            DB::table('especie_bloque')->insert($values);
        }
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
        $imagen = Imagen::where('id_especie','=',$especie->id_especie)->firstOrFail();
        $jerarquia[count($jerarquia)] = ["Especie", $especie->nombre,$especie->id_especie];

        return Inertia::render('Especie/Show',[
            "especie" => $especie,
            "jerarquia" => $jerarquia,
            "url" => $imagen->url,
        ]);
    }

    public function edit($id){
        $especie = Especie::findOrFail($id);
        $padre = $especie->getParent();

        return Inertia::render("Especie/Edit", [
            "especie" => $especie,
            "padre" => $padre,
        ]);
    }

    public function create(){
        return Inertia::render("Especie/Create");
    }

    public function search($term)
    {
        $especies = Especie::where('nombre', 'like', "%{$term}%");
        $especies = $especies->limit(10)->get();

        return response()->json($especies);
    }
}
