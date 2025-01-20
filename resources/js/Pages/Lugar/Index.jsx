import React from "react";
import { Link } from "@inertiajs/react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const LugarIndex = ({ lugares }) => {
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-5">Lugares</h1>
            <Link href="/lugar/create">
                <Button variant="contained" color="primary" className="mb-5">Crear Nuevo Lugar</Button>
            </Link>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead className="bg-gray-200">
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Municipio</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lugares.map((lugar) => (
                            <TableRow key={lugar.id_lugar}>
                                <TableCell>{lugar.nombre}</TableCell>
                                <TableCell>{lugar.estado}</TableCell>
                                <TableCell>{lugar.municipio}</TableCell>
                                <TableCell>
                                    <Link href={`/lugar/${lugar.id_lugar}`} className="mr-2">
                                        <Button variant="outlined" color="info">Ver</Button>
                                    </Link>
                                    <Link href={`/lugar/${lugar.id_lugar}/edit`} className="mr-2">
                                        <Button variant="outlined" color="primary">Editar</Button>
                                    </Link>
                                    <Link
                                        method="delete"
                                        href={`/lugar/${lugar.id_lugar}`}
                                        as="button"
                                    >
                                        <Button variant="outlined" color="error">Eliminar</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default LugarIndex;
