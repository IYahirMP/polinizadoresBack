import React from 'react';
import { useEffect } from 'react';
import { Link, router} from '@inertiajs/react';
import { useGridApiRef } from '@mui/x-data-grid';
import { Box, Button, Typography} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Layout from '../Layout';
import InfoIcon from '@mui/icons-material/Info';
import { FLASH_OPTIONS } from './FlashOptions';
import Table from '@/Components/Table';

const Index = ({imagenes, flash}) => {
    const handleDelete = (id) => {
        if (confirm('Estás seguro de que deseas eliminar esta imagen?')) {
            router.delete(route("imagen.destroy", id), {});
        }
    };

    const columns = [
        { field: 'id_imagen', headerName: 'ID', maxWidth:"100"},
        { field: 'nombre', headerName: 'Especie asociada', flex:1},
        {
            field: 'delete',
            width:130,
            align:"center",
            headerName: 'Eliminar',
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(params.row.id_imagen)}
                ><Delete /></Button>
            ),
        },
        {
            field: 'detalles',
            width:130,
            align:"center",
            headerName:"Detalles",
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href={route("imagen.show", params.row.id_imagen)}>
                        <InfoIcon/>
                </Button>
            ),
        }
    ];

    const rows = imagenes.map((imagen) => ({
        id: imagen.id_imagen,
        ...imagen,
    }));

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
        <Box className={"p-10"} sx={{display:'flex', flexDirection:'column'}}>
            <Box className="">
                <Typography variant="h4" gutterBottom>
                    Imágenes
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
                    href={route('imagen.create')}
                >
                    Añadir nueva imagen
                </Button>
            </Box>
            <Box sx={{alignSelf:'center', overflow:{xs:'scroll', md:'none'}, maxWidth:'90vw'}}>
                <Table columns={columns} rows={rows} width={600}/>
            </Box>
        </Box>
    );
}

Index.layout = (page) => <Layout children={page} title="Especies"></Layout>;
export default Index;