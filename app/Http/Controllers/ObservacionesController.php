<?php

namespace App\Http\Controllers;

use App\Models\Observaciones;
use App\Models\Especie;
use App\Models\Imagen;
use App\Models\Tiempo;
use App\Models\Lugar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ObservacionesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        //Anotacion: Pasar 20000 registros así implica subir 70MB. Pasar solo los atributos necesarios cuesta 9MB.
        // $observaciones = Observaciones::with(['especie', 'inicioDeteccion', 'finDeteccion', 'lugar'])->get();
        
        return Inertia::render('Observaciones/Index', [
            // 'observaciones' => $this->compactarRelaciones($observaciones),
        ]);
    }

    private function compactarRelaciones($observaciones){
        $indice = [];
        foreach($observaciones as $observacion){
            $rel = $observacion->getRelations();

            $indice[] = [
                "id_observacion" => $observacion->id_observacion,
                "inicio_deteccion" => $rel["inicioDeteccion"]->timestamp(),
                "fin_deteccion" => $rel["finDeteccion"]->timestamp(),
                "duracion" => $observacion->duracion_deteccion,
                "especie" => $rel["especie"]["nombre"],
                "lugar" => $rel["lugar"]["nombre"],
            ];
        }

        return $indice;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Observaciones/Create', [
            'especies' => Especie::all(),
            'tiempos' => Tiempo::all(),
            'lugares' => Lugar::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_especie' => 'required|exists:especie,id_especie',
            'inicio_deteccion' => 'required|exists:tiempo,id_tiempo',
            'fin_deteccion' => 'required|exists:tiempo,id_tiempo',
            'duracion_deteccion' => 'required|numeric|min:0',
            'id_lugar' => 'required|exists:lugar,id_lugar',
        ]);

        Observaciones::create($validated);

        return redirect()->route('Observaciones.index')->with('success', 'Observación creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $observacion = Observaciones::with(['especie', 'inicioDeteccion', 'finDeteccion', 'lugar'])->findOrFail($id);
        $rels = $observacion->getRelations();
        $imagen = Imagen::where('id_especie','=', $rels['especie']->id_especie)->get()->first();

        return Inertia::render('Observaciones/Show', [
            'observacion' => $observacion,
            'inicio_deteccion' => $rels['inicioDeteccion']->timestamp(),
            'fin_deteccion'=>$rels['finDeteccion']->timestamp(),
            'imagen' => $imagen,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $observacion = Observaciones::findOrFail($id);

        return Inertia::render('Observaciones/Edit', [
            'observacion' => $observacion,
            'especies' => Especie::all(),
            'tiempos' => Tiempo::all(),
            'lugares' => Lugar::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'id_especie' => 'required|exists:especie,id_especie',
            'inicio_deteccion' => 'required|exists:tiempo,id_tiempo',
            'fin_deteccion' => 'required|exists:tiempo,id_tiempo',
            'duracion_deteccion' => 'required|numeric|min:0',
            'id_lugar' => 'required|exists:lugar,id_lugar',
        ]);

        $Observaciones = Observaciones::findOrFail($id);
        $Observaciones->update($validated);

        return redirect()->route('Observaciones.index')->with('success', 'Observación actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $Observaciones = Observaciones::findOrFail($id);
        $Observaciones->delete();

        return redirect()->route('Observaciones.index')->with('success', 'Observación eliminada exitosamente.');
    }

    public function fetchObservations(Request $request)
{
    $pageSize = $request->input('pageSize', 10); // Tamaño de página
    $page = $request->input('page', 1); // Página actual (empieza en 1)

    // Obtener datos paginados
    $observaciones = Observaciones::with(['especie', 'inicioDeteccion', 'finDeteccion', 'lugar'])
        ->paginate($pageSize, ['*'], 'page', $page);

    $data = $this->compactarRelaciones($observaciones);

    return response()->json([
        'data' => $request->simple != null ? $data : $observaciones->items(), // Datos para la página actual
        'total' => $observaciones->total(), // Total de registros
    ]);
}
}
