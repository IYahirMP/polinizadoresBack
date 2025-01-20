import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { TextField, Button, Paper } from "@mui/material";

const LugarEdit = ({ lugar }) => {
    const { data, setData, put, errors } = useForm({
        enlace_maps: lugar.enlace_maps || "",
        altitud: lugar.altitud || "",
        longitud: lugar.longitud || "",
        nombre: lugar.nombre || "",
        estado: lugar.estado || "",
        municipio: lugar.municipio || "",
        referencias: lugar.referencias || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/lugar/${lugar.id_lugar}`);
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Editar Lugar</h1>
            <Paper className="p-5">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Reutilizar los campos del formulario como en Create */}
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
                    {/* Agregar el resto de campos aquí */}
                    <Button variant="contained" color="primary" type="submit">Actualizar</Button>
                </form>
            </Paper>
        </div>
    );
};

export default LugarEdit;
