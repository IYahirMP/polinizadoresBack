import React, { useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function Edit() {
    const { bloque } = usePage().props;
    const { data, setData, put, errors } = useForm({
        tipo_bloque: bloque.tipo_bloque,
        nombre: bloque.nombre,
        descripcion: bloque.descripcion,
        id_bloque_padre: bloque.id_bloque_padre,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('bloquetaxonomico.update', bloque.id_bloque));
    };

    return (
        <div>
            <h1>Edit Bloque</h1>
            <form onSubmit={handleSubmit}>
                <label>Tipo Bloque:</label>
                <input
                    type="text"
                    value={data.tipo_bloque}
                    onChange={(e) => setData('tipo_bloque', e.target.value)}
                />
                {errors.tipo_bloque && <div>{errors.tipo_bloque}</div>}
                <label>Nombre:</label>
                <input
                    type="text"
                    value={data.nombre}
                    onChange={(e) => setData('nombre', e.target.value)}
                />
                {errors.nombre && <div>{errors.nombre}</div>}
                <label>Descripcion:</label>
                <textarea
                    value={data.descripcion}
                    onChange={(e) => setData('descripcion', e.target.value)}
                ></textarea>
                {errors.descripcion && <div>{errors.descripcion}</div>}
                <button type="submit">Save</button>
            </form>
        </div>
    );
}
