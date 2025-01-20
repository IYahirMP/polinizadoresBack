<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Observaciones extends Model
{
    use HasFactory;

    protected $table = 'observacion';
    protected $primaryKey = 'id_observacion';
    protected $fillable = [
        'id_especie',
        'inicio_deteccion',
        'fin_deteccion',
        'duracion_deteccion',
        'id_lugar',
    ];

    public function especie()
    {
        return $this->belongsTo(Especie::class, 'id_especie');
    }

    public function inicioDeteccion()
    {
        return $this->belongsTo(Tiempo::class, 'inicio_deteccion');
    }

    public function finDeteccion()
    {
        return $this->belongsTo(Tiempo::class, 'fin_deteccion');
    }

    public function lugar()
    {
        return $this->belongsTo(Lugar::class, 'id_lugar');
    }
}
