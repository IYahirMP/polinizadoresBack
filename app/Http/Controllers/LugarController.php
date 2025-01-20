<?php

namespace App\Http\Controllers;

use App\Models\Lugar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LugarController extends Controller
{
    /**
     * Listar todos los registros de la tabla 'lugar'.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $lugares = Lugar::all();

        return Inertia::render('Lugar/Index', [
            'lugares' => $lugares,
        ]);
    }

    /**
     * Mostrar el formulario para crear un nuevo lugar.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Lugar/Create');
    }

    /**
     * Almacenar un nuevo lugar en la base de datos.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'enlace_maps' => 'nullable|url',
            'latitud' => 'required|numeric',
            'longitud' => 'required|numeric',
            'nombre' => 'required|string|max:255',
            'estado' => 'required|string|max:255',
            'municipio' => 'required|string|max:255',
            'referencias' => 'nullable|string',
        ]);

        Lugar::create($validated);

        return redirect()->route('lugar.index')->with('message', 'Lugar creado exitosamente.');
    }

    /**
     * Mostrar un lugar específico.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function show($id)
    {
        $lugar = Lugar::findOrFail($id);

        return Inertia::render('Lugar/Show', [
            'lugar' => $lugar,
        ]);
    }

    /**
     * Mostrar el formulario para editar un lugar específico.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $lugar = Lugar::findOrFail($id);

        return Inertia::render('Lugar/Edit', [
            'lugar' => $lugar,
        ]);
    }

    /**
     * Actualizar un lugar en la base de datos.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $lugar = Lugar::findOrFail($id);

        $validated = $request->validate([
            'enlace_maps' => 'nullable|url',
            'latitud' => 'required|numeric|min:-180|max:180',
            'longitud' => 'required|numeric|min:-90|max:90',
            'nombre' => 'required|string|max:255',
            'estado' => 'required|string|max:255',
            'municipio' => 'required|string|max:255',
            'referencias' => 'nullable|string',
        ]);

        $lugar->update($validated);

        return redirect()->route('lugar.index')->with('message', 'Lugar actualizado exitosamente.');
    }

    /**
     * Eliminar un lugar de la base de datos.
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($id)
    {
        $lugar = Lugar::findOrFail($id);
        $lugar->delete();

        return redirect()->route('lugar.index')->with('message', 'Lugar eliminado exitosamente.');
    }
}
