<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EspecieBloque extends Model
{
    use HasFactory;
    protected $table = 'especie_bloque';

    protected $primaryKey = 'id_especie_bloque';
    protected $keyType = 'integer';

    public function getRouteKeyName(): string
    {
        return 'id_especie_bloque'; // This is the crucial part
    }

    public function especie() {
        return $this->belongsTo(Especie::class, 'id_especie', 'id_especie');
    }

    public function bloqueTaxonomico() {
        return $this->belongsTo(BloqueTaxonomico::class, 'id_bloque', 'id_bloque');
    }
}
