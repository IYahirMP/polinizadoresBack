import React from 'react';
import { useEffect } from 'react';
import { Link, router} from '@inertiajs/react';
import { DataGrid, useGridApiRef, DEFAULT_GRID_AUTOSIZE_OPTIONS } from '@mui/x-data-grid';
import { Box, Button, ThemeProvider, Typography} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Layout from '../Layout';
import InfoIcon from '@mui/icons-material/Info';

const Index = ({bloques, flash}) => {
    const handleDelete = (id) => {
        if (confirm('Estás seguro de que deseas eliminar este bloque?')) {
            router.delete(route("bloquetaxonomico.destroy", id), {});
            console.log("deleted");
        }
    };

    const columns = [
        { field: 'id_bloque', headerName: 'ID', maxWidth:"100"},
        { field: 'tipo_bloque', headerName: 'Tipo', flex:1},
        { field: 'nombre', headerName: 'Nombre', flex:1},
        {
            field: 'edit',
            maxWidth:"100",
            align:"center",
            headerName: 'Edit',
            renderCell: (params) => (
                <Button
                variant="contained"
                color="primary"
                component={Link}
                href={route('bloquetaxonomico.edit', params.row.id_bloque)}
                ><Edit /></Button>                    
            ),
        },
        {
            field: 'delete',
            maxWidth:"200",
            align:"center",
            headerName: 'Delete',
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(params.row.id_bloque)}
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
                    href={route("bloquetaxonomico.show", params.row.id_bloque)}>
                        <InfoIcon/>
                </Button>
            ),
        }
    ];

    const apiRef = useGridApiRef;

    const rows = bloques.map((bloque) => ({
        id: bloque.id_bloque,
        ...bloque,
    }));

    useEffect(() => {
        // Trigger resize whenever rows or columns change
        if (apiRef.current) {
          apiRef.current.autoSizeColumns();
        }
      }, [rows, columns]);

    return (
        <Box className={"p-10"}>
            <Typography variant="h4" gutterBottom>
                Bloques taxonomicos / Taxones
            </Typography>
            {flash != undefined && flash.success && (
                <Typography variant="body1" color="success.main" gutterBottom>
                    {flash.success}
                </Typography>
            )}
            <Box mb={2}>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href={route('bloquetaxonomico.create')}
                >
                    Añadir nuevo taxón
                </Button>
            </Box>
            <div style={{height:'80vh'}}>
                <DataGrid
                        columns={columns}
                        disableSelectionOnClick
                        rows={rows}
                        disableColumnResize={true}
                        pageSizeOptions={[10, 20, 30]}
                        initialState={{
                            pagination:{
                                paginationModel:{pageSize:10, page:0}
                            }
                        }}
                    />
            </div>
        </Box>
    );
}

Index.layout = (page) => <Layout children={page} title="Taxones"></Layout>;
export default Index;