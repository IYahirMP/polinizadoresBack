<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Especie extends Model
{
    use HasFactory;
    protected $table = 'especie';
    protected $primaryKey = 'id_especie';
    public $incrementing = true;
    protected $keyType = 'integer';
    public $timestamps = true;

    public function getOrderedHierarchy()
    {
        $jerarquia = DB::table('especie')
            ->join('especie_bloque', 'especie.id_especie', "=", 'especie_bloque.id_especie')
            ->join('bloque_taxonomico', 'especie_bloque.id_bloque', '=', 'bloque_taxonomico.id_bloque')
            ->select(['bloque_taxonomico.nombre', 'bloque_taxonomico.tipo_bloque', 'bloque_taxonomico.id_bloque'])
            ->where('especie.id_especie','=',$this->id_especie)->get();

        $taxonesOrdenados = [
            "Dominio",
            "Reino",
            "Filo",
            "Clase",
            "Órden",
            "Familia",
            "Género"
        ];

        $jerarquiaOrdenada = [];

        $i = 0;
        foreach($jerarquia as $taxon){
            foreach($taxonesOrdenados as $taxonCorrecto)
            {
                if ($taxon->tipo_bloque == $taxonCorrecto)
                {
                    $jerarquiaOrdenada[$i++] = [$taxonCorrecto, $taxon->nombre, $taxon->id_bloque];
                }
            }
        }

        // dd(json_encode($jerarquiaOrdenada));
        return $jerarquiaOrdenada;
    }
}
