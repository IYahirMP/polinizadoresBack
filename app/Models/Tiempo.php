<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tiempo extends Model
{
    use HasFactory;

    protected $table = 'tiempo';

    protected $primaryKey = 'id_tiempo';

    protected $fillable = [
        'año',
        'mes',
        'semana',
        'dia',
        'hora',
        'minuto',
    ];

    public $timestamps = false; // No se necesitan los campos 'created_at' ni 'updated_at'

    public function timestamp(){
        return "$this->dia/$this->mes/$this->año $this->hora:$this->minuto";
    }

    public static function procesarTiempo(Tiempo $tiempo){
        return "$tiempo->dia/$tiempo->mes/$tiempo->año $tiempo->hora:$tiempo->minuto";
    }
}
