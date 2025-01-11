<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
