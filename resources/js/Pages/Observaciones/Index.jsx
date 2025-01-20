import React from 'react';
import { useMemo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from '@inertiajs/react';
import EditButton from '@/Components/TableButtons/EditButton';
import DeleteButton from '@/Components/TableButtons/DeleteButton';
import DetailsButton from '@/Components/TableButtons/DetailsButton';
import Layout from '../Layout';
import { FLASH_OPTIONS } from './FlashOptions';
// import Table from '@/Components/Table';
import TableOnDemand from '@/Components/TableOnDemand';
import {API_ENDPOINTS} from '@/Config/APISettings';

const Index = ({flash}) => {
    const rutas = {
        "editar": "observaciones.edit",
        "eliminar": "observaciones.destroy",
        "crear": "observaciones.create",
        "detalles": "observaciones.show"
    }

    const columns = useMemo(
        () => [
          { field: 'id_observacion', headerName: 'ID', width: 100 },
          { field: 'especie', headerName: 'Especie', flex:1 },
          { field: 'inicio_deteccion', headerName: 'Inicio', flex:1 },
          { field: 'fin_deteccion', headerName: 'Fin', flex:1 },
          { field: 'duracion', headerName: 'Duración', flex:1 },
          { field: 'lugar', headerName: 'Lugar', flex:1 },
          { field: 'editar', headerName: 'Editar', width: 130, align:"center" , renderCell: (p) => <EditButton ruta={rutas.editar} parametros={p.row.id_observacion}/>},
          { field: 'eliminar', headerName: 'Eliminar', width: 130, align:"center" , renderCell: (p) => <DeleteButton ruta={rutas.eliminar} parametros={p.row.id_observacion}/>},
          { field: 'detalles', headerName: 'Detalles', width: 130, align:"center" , renderCell: (p) => <DetailsButton ruta={rutas.detalles} parametros={p.row.id_observacion}/>},
        ],
        []
      );

    // const rows = observaciones.map((observacion) => ({
    //     id: observacion.id_observacion,
    //     ...observacion,
    // }));

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
            <Box sx={{alignSelf:'flex-start'}}>
                <Typography variant="h4" gutterBottom>
                    Observaciones
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
            
            <Box mb={2} sx={{alignSelf:'flex-start'}}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href={route('observaciones.create')}
                >
                    Añadir nueva observación
                </Button>
            </Box>
            <Box sx={{alignSelf:'center', overflow:'scroll'}}>
                <TableOnDemand columns={columns} api={API_ENDPOINTS.OBSERVACIONES}/>
            </Box>
        </Box>
    );
}

Index.layout = (page) => <Layout children={page} title="Observaciones"></Layout>;
export default Index;