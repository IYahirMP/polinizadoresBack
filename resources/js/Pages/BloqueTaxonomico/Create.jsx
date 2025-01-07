import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, errors } = useForm({
        tipo_bloque: '',
        nombre: '',
        descripcion: '',
        id_bloque_padre: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('bloquetaxonomico.store'));
    };

    return (
        <div>
            <h1>Create Bloque</h1>
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
