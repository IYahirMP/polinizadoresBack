import React, { useState, useRef } from 'react';
import { CircularProgress } from '@mui/material';
import { Link, useForm } from '@inertiajs/react';
import { Box, Button, Grid, MenuItem, TextField, Typography, Autocomplete } from '@mui/material';
import Layout from '../Layout';

const Create = () => {

    const [bloquesPadreOptions, setBloquesPadreOptions] = useState([]); // Options for autocomplete
    const [loading, setLoading] = useState(false); // Loading state

    const handleInputChange = (event, value, tipo) => {
        const taxonesSuperiores = {
            "Dominio":"",
            "Reino":"dominio",
            "Filo":"reino",
            "Clase":"filo",
            "Órden":"clase",
            "Familia":"orden",
            "Género":"familia",
            }

        // setInputValue(value);
        setData('id_bloque_padre', "");
        // Trigger API fetch only if input value changes
        if (value.length > 0 && tipo != 'Dominio') { // Start fetching after 2 characters
            setLoading(true);
            fetch(`/bloquetaxonomico/search/${value}?tipo=${taxonesSuperiores[tipo]}`) // Replace with your API endpoint
                .then((response) => response.json())
                .then((data) => {
                    // console.log(data);
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
    
    const tiposDeBloque = [
        'Dominio', 'Reino', 'Filo', 'Clase', 'Orden', 'Familia', 'Género'
    ];

    const { data, setData, post, errors, processing } = useForm({
        tipo_bloque: '',
        nombre: '',
        descripcion: '',
        id_bloque_padre: '', // nullable, so initially empty
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('bloquetaxonomico.store'));
    };  

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Crear nuevo bloque taxonómico
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* ID Bloque Padre */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Tipo de bloque"
                            value={data.tipo_bloque}
                            onChange={(e) => setData('tipo_bloque', e.target.value)}
                            error={!!errors.tipo_bloque}
                            helperText={errors.tipo_bloque}
                        >
                            <MenuItem value="">Ninguno</MenuItem>
                            { tiposDeBloque != undefined && tiposDeBloque.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            )) }
                        </TextField>
                    </Grid>

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

                    {/* Descripcion */}
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
                    {data.tipo_bloque != 'Dominio' && (
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                fullWidth
                                options={bloquesPadreOptions} // State to store fetched options
                                value={bloquesPadreOptions.find(option => option.id_bloque === data.id_bloque_padre) || null}
                                getOptionLabel={(option) => `${option.nombre}: ${option.id_bloque}` || ""}
                                isOptionEqualToValue={(option, value) => option.id_bloque === value.id_bloque}
                                onChange={(event, newValue) => {
                                    setData('id_bloque_padre', newValue ? newValue.id_bloque : '');
                                }}
                                onInputChange={(event, value) => handleInputChange(event, value, data.tipo_bloque)} // Handles keystroke changes
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
                    )}
                </Grid>

                {/* Submit Button */}
                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary" 
                    disabled={processing} style={{margin:10}}>
                        {processing ? 'Creando...' : 'Crear'}
                    </Button>
                    <Button variant="contained" color="primary" style={{margin:10}}>
                        <Link href={route("bloquetaxonomico.index")}>Regresar al índice</Link>
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

Create.layout = (page) => <Layout children={page} title="Create Bloque Taxonómico" />;
export default Create;
