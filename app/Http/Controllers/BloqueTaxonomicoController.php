<?php

namespace App\Http\Controllers;

use App\Models\BloqueTaxonomico;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class BloqueTaxonomicoController extends Controller
{
    private const taxones = [
        // taxon en la api => taxon como está registrado en lab ase de datos
        "dominio" => 'Dominio',
        "reino" => 'Reino',
        "filo" => 'Filo',
        "clase" => 'Clase',
        "orden" => 'Órden',
        "familia" => 'Familia',
        "genero" => 'Género'
    ];

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
        $descendientesDirectos = $bloque->getDirectDescendants();
        $tieneDescendientes = sizeof($descendientesDirectos) != 0;


        // dd($bloquePadre);
        return Inertia::render('BloqueTaxonomico/Show',[
            "bloque" => $bloque,
            "bloquePadre" => $bloquePadre,
            "descendientesDirectos" => $descendientesDirectos,
            "tieneDescendientes" => $tieneDescendientes,
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

    public function edit($id_bloque)
    {
        $bloque = BloqueTaxonomico::findOrFail($id_bloque);
        $bloquePadre = $bloque->getParent();
        return Inertia::render('BloqueTaxonomico/Edit', [
            'bloque' => $bloque,
            'padre' => $bloquePadre,
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

    public function update(Request $request, $bloque)
    {
        $request->validate([
            'tipo_bloque' => 'required|string|max:255',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'id_bloque_padre' => 'nullable|exists:bloque_taxonomico,id_bloque',
        ]);

        $bloque = BloqueTaxonomico::findOrFail($bloque);

        $bloque->update($request->all());
        return redirect()->route('bloquetaxonomico.index')->with('success', 'Bloque updated successfully!');
    }

    public function destroy($bloque)
    {
        $destroyed = BloqueTaxonomico::destroy($bloque);
        return redirect()->route('bloquetaxonomico.index')->with('success', 'Bloque deleted successfully!');
    }

    public function search(Request $request, $term)
    {
        $bloques = BloqueTaxonomico::where('nombre', 'like', "%{$term}%");

        foreach(BloqueTaxonomicoController::taxones as $taxon => $taxonbd){
            if ($request['tipo'] == $taxon){
                $bloques = $bloques->where('tipo_bloque', '=', $taxonbd);
                break;
            }
        }

        $bloques = $bloques->limit(10)->get();

        return response()->json($bloques);
    }

    public function ancestors($id){
        $bloque = BloqueTaxonomico::findOrFail($id);
        $ancestros = $bloque->getAncestors();
        return response()->json($ancestros);
    }
}
