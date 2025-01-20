import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { TextField, Button, Paper } from "@mui/material";

const LugarCreate = () => {
    const { data, setData, post, errors } = useForm({
        enlace_maps: "",
        altitud: "",
        longitud: "",
        nombre: "",
        estado: "",
        municipio: "",
        referencias: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/lugar");
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Crear Nuevo Lugar</h1>
            <Paper className="p-5">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <TextField
                        label="Enlace Maps"
                        value={data.enlace_maps}
                        onChange={(e) => setData("enlace_maps", e.target.value)}
                        error={!!errors.enlace_maps}
                        helperText={errors.enlace_maps}
                    />
                    <TextField
                        label="Altitud"
                        type="number"
                        value={data.altitud}
                        onChange={(e) => setData("altitud", e.target.value)}
                        error={!!errors.altitud}
                        helperText={errors.altitud}
                    />
                    <TextField
                        label="Longitud"
                        type="number"
                        value={data.longitud}
                        onChange={(e) => setData("longitud", e.target.value)}
                        error={!!errors.longitud}
                        helperText={errors.longitud}
                    />
                    <TextField
                        label="Nombre"
                        value={data.nombre}
                        onChange={(e) => setData("nombre", e.target.value)}
                        error={!!errors.nombre}
                        helperText={errors.nombre}
                    />
                    <TextField
                        label="Estado"
                        value={data.estado}
                        onChange={(e) => setData("estado", e.target.value)}
                        error={!!errors.estado}
                        helperText={errors.estado}
                    />
                    <TextField
                        label="Municipio"
                        value={data.municipio}
                        onChange={(e) => setData("municipio", e.target.value)}
                        error={!!errors.municipio}
                        helperText={errors.municipio}
                    />
                    <TextField
                        label="Referencias"
                        multiline
                        rows={3}
                        value={data.referencias}
                        onChange={(e) => setData("referencias", e.target.value)}
                        error={!!errors.referencias}
                        helperText={errors.referencias}
                    />
                    <Button variant="contained" color="primary" type="submit">Guardar</Button>
                </form>
            </Paper>
        </div>
    );
};

export default LugarCreate;
