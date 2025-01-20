import React from "react";
import { Paper, Button } from "@mui/material";
import { Link } from "@inertiajs/react";

const LugarShow = ({ lugar }) => {
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Detalles del Lugar</h1>
            <Paper className="p-5">
                <p><strong>Nombre:</strong> {lugar.nombre}</p>
                <p><strong>Estado:</strong> {lugar.estado}</p>
                <p><strong>Municipio:</strong> {lugar.municipio}</p>
                <p><strong>Altitud:</strong> {lugar.altitud}</p>
                <p><strong>Longitud:</strong> {lugar.longitud}</p>
                <p><strong>Referencias:</strong> {lugar.referencias || "N/A"}</p>
                <p><strong>Enlace Maps:</strong> {lugar.enlace_maps || "N/A"}</p>
                <div className="mt-5">
                    <Link href="/lugar">
                        <Button variant="outlined" color="primary">Volver</Button>
                    </Link>
                </div>
            </Paper>
        </div>
    );
};

export default LugarShow;
