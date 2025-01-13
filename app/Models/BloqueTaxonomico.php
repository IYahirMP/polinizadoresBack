<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class BloqueTaxonomico extends Model
{
    use HasFactory;

    protected $table = 'bloque_taxonomico';
    protected $primaryKey = 'id_bloque';

    protected $fillable = [
        'tipo_bloque',
        'nombre',
        'descripcion',
        'id_bloque_padre',
    ];

    public function getParent(){
        return BloqueTaxonomico::select('*')->where('id_bloque', $this->id_bloque_padre)->get()->first();
    }

    public function getDirectDescendants(){
        $esGenero = $this->tipo_bloque == "Género";

        if ($esGenero){
            $descendientesDirectosTmp = DB::table('especie_bloque')
                ->join('especie','especie_bloque.id_especie','=','especie.id_especie')
                ->select(['especie.id_especie as id_bloque', 'especie.nombre'])
                ->where('id_bloque', '=', $this->id_bloque)
                ->get();
        }else{
            $descendientesDirectosTmp = BloqueTaxonomico::all()->where("id_bloque_padre","=" ,$this->id_bloque);
        }


        if ($descendientesDirectosTmp->toArray() == null){
            $descendientesDirectos = array();
        } else
        {
            $descendientesDirectos = $descendientesDirectosTmp->toArray();   
            $vals = array();

            $i = 0;
            foreach ($descendientesDirectos as $k=>$v){
                $vals[$i] = $v;
                $i++;
            }
            $descendientesDirectos = $vals;
        }
        return $descendientesDirectos;
    }
}
