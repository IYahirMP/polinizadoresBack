<?php

namespace App\Http\Controllers;

use App\Models\BloqueTaxonomico;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class BloqueTaxonomicoController extends Controller
{

    // Metodos que retornan vistas de Inertia
    public function index()
    {
        $bloques = BloqueTaxonomico::all();
        return Inertia::render('BloqueTaxonomico/Index', [
            'bloques' => $bloques,
        ]);
    }

    public function show($bloque){
        $bloque = BloqueTaxonomico::all()->where("id_bloque",$bloque)->first();
        // dd($bloque->id_bloque);
        $bloquePadre = $bloque->getParent();
        $descendientesDirectosTmp = BloqueTaxonomico::all()->where("id_bloque_padre","=" ,$bloque->id_bloque);

        if ($descendientesDirectosTmp->toArray() == null){
            $descendientesDirectos = array();
        }else{
            $descendientesDirectos = $descendientesDirectosTmp->toArray();   
            $vals = array();

            $i = 0;
            foreach ($descendientesDirectos as $k=>$v){
                $vals[$i] = $v;
                $i++;
            }
            $descendientesDirectos = $vals;
        }


        // dd($bloquePadre);
        return Inertia::render('BloqueTaxonomico/Show',[
            "bloque" => $bloque,
            "bloquePadre" => $bloquePadre,
            "descendientesDirectos" => $descendientesDirectos,
        ]);
    }

    public function create()
    {
        $tiposDeBloque = DB::table('bloque_taxonomico')->select('tipo_bloque')->distinct()->get();
        $bloquesPadre = DB::table('bloque_taxonomico')->select('id_bloque', 'nombre')->get();
        return Inertia::render('BloqueTaxonomico/Create', [
            "tiposDeBloque" => $tiposDeBloque,
            "bloquesPadre"=> $bloquesPadre,
        ]);
    }

    public function edit(BloqueTaxonomico $bloque)
    {
        return Inertia::render('BloqueTaxonomico/Edit', [
            'bloque' => $bloque,
        ]);
    }

    // Métodos almacenamiento y borrado

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

    public function search($term)
    {
        $bloques = BloqueTaxonomico::where('nombre', 'like', "%{$term}%")
            ->limit(10) // Limit results to reduce load
            ->get();

        return response()->json($bloques);
    }
}
