import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Typography, Stack } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Layout from '../Layout';
import { DEFAULT_GRID_AUTOSIZE_OPTIONS } from '@mui/x-data-grid';

const Index = ({bloques, flash}) => {

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this bloque?')) {
            Inertia.delete(route('bloquetaxonomico.destroy', id));
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
    ];

    const rows = bloques.map((bloque) => ({
        id: bloque.id_bloque,
        ...bloque,
    }));

    return (
        <Box className={"p-10"}>
            <Typography variant="h4" gutterBottom>
                Bloques
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
                    href={route('bloquetaxonomico.store')}
                >
                    Create New Bloque
                </Button>
            </Box>
                <DataGrid
                    columns={columns}
                    disableSelectionOnClick
                    rowsPerPageOptions={[2, 10, 20]}
                    autosizeOnMount
                    rows={rows}
                />
        </Box>
    );
}

Index.layout = (page) => <Layout children={page} title="some"></Layout>;
export default Index;