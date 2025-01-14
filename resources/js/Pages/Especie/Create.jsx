import React, { useState, useEffect, useRef} from 'react';
import { CircularProgress } from '@mui/material';
import { Link, useForm } from '@inertiajs/react';
import { Box, Button, Grid, MenuItem, TextField, Typography, Autocomplete } from '@mui/material';
import Layout from '../Layout';

const Create = () => {

    const [bloquesPadreOptions, setBloquesPadreOptions] = useState([]); // Options for autocomplete
    const [loading, setLoading] = useState(false); // Loading state

    const handleInputChange = (event, value) => {

        if (value.length > 0) {
            setData('id_bloque_padre', '');
            setLoading(true);
            fetch(`/bloquetaxonomico/search/${value}?tipo=genero`) // Replace with your API endpoint
                .then((response) => response.json())
                .then((data) => {
                    setBloquesPadreOptions(data); // Update options with API response
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setBloquesPadreOptions([]); // Clear options if input is too short
        }
    };

    const { data, setData, post, errors, processing } = useForm({
        nombre: '',
        nombre_comun: '',
        descripcion: '',
        id_bloque_padre: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('especie.store'));
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Crear especie
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* Nombre */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Nombre"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            error={!!errors.nombre}
                            helperText={errors.nombre}
                            required
                        />
                    </Grid>

                    {/* Nombre */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Nombre común"
                            value={data.nombre_comun}
                            onChange={(e) => setData('nombre_comun', e.target.value)}
                            error={!!errors.nombre_comun}
                            helperText={errors.nombre_comun}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Descripción"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            error={!!errors.descripcion}
                            helperText={errors.descripcion}
                            multiline
                            rows={4}
                        />
                    </Grid>

                    {/* ID Bloque Padre */}
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            fullWidth
                            options={bloquesPadreOptions} // State to store fetched options
                            getOptionLabel={(option) => `${option.nombre}: ${option.id_bloque}` || ""}
                            value={ bloquesPadreOptions.find(option => option.id_bloque === data.id_bloque_padre) || null}
                            isOptionEqualToValue={(option, value) => option.id_bloque === value.id_bloque}
                            onChange={(event, newValue) => {
                                setData('id_bloque_padre', newValue ? newValue.id_bloque : '');
                            }}
                            onInputChange={handleInputChange} // Handles keystroke changes
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Taxón superior"
                                    error={!!errors.id_bloque_padre}
                                     helperText={"Es necesario incluir este campo"}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {loading && <CircularProgress color="inherit" size={20} />}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            loading={loading} // Shows loading spinner while fetching
                            noOptionsText="No se encontraron resultados"
                        />
                    </Grid>
                </Grid>

                {/* Submit Button */}
                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary" 
                    disabled={processing} style={{margin:10}}>
                        {processing ? 'Guardando...' : 'Guardar'}
                    </Button>
                    <Button variant="contained" color="primary" style={{margin:10}}>
                        <Link href={route("especie.index")}>Regresar al índice</Link>
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

Create.layout = (page) => <Layout children={page} title="Crear especie" />;
export default Create;
