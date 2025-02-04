import React from 'react';
import { useEffect } from 'react';
import { Link, router} from '@inertiajs/react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { Box, Button, Typography} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Layout from '../Layout';
import InfoIcon from '@mui/icons-material/Info';
import { FLASH_OPTIONS } from './FlashOptions';
import Table from '@/Components/Table';

const Index = ({especies, flash}) => {
    const handleDelete = (id) => {
        if (confirm('Estás seguro de que deseas eliminar esta especie?')) {
            router.delete(route("especie.destroy", id), {});
            console.log("deleted");
        }
    };

    const columns = [
        { field: 'id_especie', headerName: 'ID', maxWidth:"100"},
        { field: 'nombre', headerName: 'Nombre', flex:1},
        { field: 'nombre_comun', headerName: 'Nombre común', flex:1},
        {
            field: 'edit',
            maxWidth:"100",
            align:"center",
            headerName: 'Editar',
            renderCell: (params) => (
                <Button
                variant="contained"
                color="primary"
                component={Link}
                href={route('especie.edit', params.row.id_especie)}
                ><Edit /></Button>                    
            ),
        },
        {
            field: 'delete',
            maxWidth:"200",
            align:"center",
            headerName: 'Eliminar',
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(params.row.id_especie)}
                ><Delete /></Button>
            ),
        },
        {
            field: 'detalles',
            maxWidth:200,
            align:"center",
            headerName:"Detalles",
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href={route("especie.show", params.row.id_especie)}>
                        <InfoIcon/>
                </Button>
            ),
        }
    ];

    const apiRef = useGridApiRef;

    const rows = especies.map((especie) => ({
        id: especie.id_especie,
        ...especie,
    }));

    useEffect(() => {
        // Trigger resize whenever rows or columns change
        if (apiRef.current) {
          apiRef.current.autoSizeColumns();
        }
      }, [rows, columns]);

    // Los mensajes Flash sirven cuando se redirecciona desde una acción diferente.
    // Ejemplo: Eliminar un registro. Al finalizar, se envía un mensaje flash diciendo si fue exitoso o no.
    let currentFlash = '';
    if (flash.message != undefined){
        let accion = flash.message.action;
        let estado = flash.message.status;

        currentFlash = FLASH_OPTIONS[accion][estado];
        // console.log(currentFlash);
    }

    return (
        <Box className={"p-10"}>
            <Box className="">
                <Typography variant="h4" gutterBottom>
                    Especies
                </Typography>
                {flash != undefined && flash.message && (
                    <div className="mb-5">
                        <Typography variant="h5" color={currentFlash.color} gutterBottom>
                            {`${currentFlash.header}: ${flash.message.text}`}
                        </Typography>
                        <Typography variant="body1" color={currentFlash.color} gutterBottom>
                            {currentFlash.message}
                        </Typography>
                    </div>
                )}
            </Box>
            
            <Box mb={2}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href={route('especie.create')}
                >
                    Añadir nueva especie
                </Button>
            </Box>
            <Table columns={columns} rows={rows}/>
        </Box>
    );
}

Index.layout = (page) => <Layout children={page} title="Especies"></Layout>;
export default Index;