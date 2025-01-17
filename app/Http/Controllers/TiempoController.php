<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tiempo;
use Carbon\Carbon;

class TiempoController extends Controller
{
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
