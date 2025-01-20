<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tiempo;
use Carbon\Carbon;

class TiempoController extends Controller
{
    /**
     * Listar todos los registros de la tabla 'tiempo'.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tiempos = Tiempo::all();

        return response()->json([
            'message' => 'Registros obtenidos exitosamente.',
            'data' => $tiempos,
        ]);
    }

    /**
     * Mostrar un registro específico de la tabla 'tiempo'.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $tiempo = Tiempo::find($id);

        if (!$tiempo) {
            return response()->json([
                'message' => 'Registro no encontrado.',
            ], 404);
        }

        return response()->json([
            'message' => 'Registro obtenido exitosamente.',
            'data' => $tiempo,
        ]);
    }

    /**
     * Actualizar un registro específico de la tabla 'tiempo'.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $tiempo = Tiempo::find($id);

        if (!$tiempo) {
            return response()->json([
                'message' => 'Registro no encontrado.',
            ], 404);
        }

        // Validar la entrada
        $validated = $request->validate([
            'fecha_hora' => 'required|date_format:m/d/Y H:i', // Validar formato MM/DD/YYYY HH:mm
        ]);

        // Convertir la fecha y hora a un objeto Carbon para extraer valores
        $fechaHora = Carbon::createFromFormat('m/d/Y H:i', $validated['fecha_hora']);

        // Actualizar el registro
        $tiempo->update([
            'año' => $fechaHora->year,
            'mes' => $fechaHora->month,
            'semana' => $fechaHora->weekOfYear,
            'dia' => $fechaHora->day,
            'hora' => $fechaHora->hour,
            'minuto' => $fechaHora->minute,
        ]);

        return response()->json([
            'message' => 'Registro actualizado exitosamente.',
            'data' => $tiempo,
        ]);
    }

    /**
     * Eliminar un registro específico de la tabla 'tiempo'.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $tiempo = Tiempo::find($id);

        if (!$tiempo) {
            return response()->json([
                'message' => 'Registro no encontrado.',
            ], 404);
        }

        $tiempo->delete();

        return response()->json([
            'message' => 'Registro eliminado exitosamente.',
        ]);
    }

    /**
     * Almacenar un nuevo elemento en la tabla 'tiempo' usando fecha y hora.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validar que la fecha y hora sean requeridas y estén en el formato correcto
        $validated = $request->validate([
            'fecha_hora' => 'required|date_format:m/d/Y H:i', // Validar formato MM/DD/YYYY HH:mm
        ]);

        // Convertir la fecha y hora a un objeto Carbon para extraer valores
        $fechaHora = Carbon::createFromFormat('m/d/Y H:i', $validated['fecha_hora']);

        // Crear un nuevo registro en la tabla 'tiempo'
        $tiempo = Tiempo::create([
            'año' => $fechaHora->year,
            'mes' => $fechaHora->month,
            'semana' => $fechaHora->weekOfYear,
            'dia' => $fechaHora->day,
            'hora' => $fechaHora->hour,
            'minuto' => $fechaHora->minute,
        ]);

        return response()->json([
            'message' => 'Elemento creado exitosamente.',
            'data' => $tiempo,
        ], 201);
    }
}
