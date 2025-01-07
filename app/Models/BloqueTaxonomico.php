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

    public function parent()
    {
        return $this->belongsTo(BloqueTaxonomico::class, 'id_bloque_padre');
    }

    public function children()
    {
        return $this->hasMany(BloqueTaxonomico::class, 'id_bloque_padre');
    }
}
