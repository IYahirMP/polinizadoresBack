import React, { useState, useEffect} from 'react';
import { CircularProgress } from '@mui/material';
import { Link, useForm, router } from '@inertiajs/react';
import { Box, Button, Grid, MenuItem, TextField, Typography, Autocomplete } from '@mui/material';
import Layout from '../Layout';
import axios from 'axios';

const Edit = ({bloque, padre}) => {

    const [bloquesPadreOptions, setBloquesPadreOptions] = useState([]); // Options for autocomplete
    const [loading, setLoading] = useState(false); // Loading state
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const initialFetch = async () => {
            if (padre.nombre) { // Check if padre has a name (indicates initial value)
                setLoading(true);
                try {
                    const response = await axios.get(`/bloquetaxonomico/search/${padre.nombre}`); 
                    console.log(response.data);
                    setBloquesPadreOptions(response.data);
                    setData('id_bloque_padre', bloque.id_bloque_padre)
                    console.log(bloquesPadreOptions)
            } catch (error) {
              console.error('Error fetching initial bloque padre options:', error);
            } finally {
              setLoading(false);
            }
          }
        };
        initialFetch();
      }, [padre]);

    const handleInputChange = (event, value) => {
        // setInputValue(value);
        setData('id_bloque_padre', "");
        // Trigger API fetch only if input value changes
        if (value.length > 0) { // Start fetching after 2 characters
            setLoading(true);
            fetch(`/bloquetaxonomico/search/${value}`) // Replace with your API endpoint
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
    
    const tiposDeBloque = [
        'Dominio', 'Reino', 'Filo', 'Clase', 'Orden', 'Familia', 'Género'
    ];

    const { data, setData, patch, errors, processing } = useForm({
        tipo_bloque: bloque.tipo_bloque,
        nombre: bloque.nombre,
        descripcion: bloque.descripcion,
        id_bloque_padre: '', // nullable, so initially empty
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('bloquetaxonomico.update', bloque.id_bloque));
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Editar bloque taxonómico
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
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            fullWidth
                            options={bloquesPadreOptions} // State to store fetched options
                            getOptionLabel={(option) => option.nombre || ""}
                            value={bloquesPadreOptions.find((option) => option.id_bloque === data.id_bloque_padre) || null}
                            onChange={(event, newValue) => setData('id_bloque_padre', newValue ? newValue.id_bloque : '')}
                            onInputChange={handleInputChange} // Handles keystroke changes
                            // inputValue={inputValue}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Taxón superior"
                                    error={!!errors.id_bloque_padre}
                                    helperText={errors.id_bloque_padre}
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
                            isOptionEqualToValue={(option, value) => option.id_bloque === value.id_bloque}
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
                        <Link href={route("bloquetaxonomico.index")}>Regresar al índice</Link>
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

Edit.layout = (page) => <Layout children={page} title="Create Bloque Taxonómico" />;
export default Edit;
