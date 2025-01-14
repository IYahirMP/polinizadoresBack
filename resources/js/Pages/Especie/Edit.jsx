import React, { useState, useEffect, useRef} from 'react';
import { CircularProgress } from '@mui/material';
import { Link, useForm, router } from '@inertiajs/react';
import { Box, Button, Grid, MenuItem, TextField, Typography, Autocomplete } from '@mui/material';
import Layout from '../Layout';
import axios from 'axios';

const Edit = ({especie, padre}) => {

    const [bloquesPadreOptions, setBloquesPadreOptions] = useState([]); // Options for autocomplete
    const [loading, setLoading] = useState(false); // Loading state
    const autoCompleteRef = useRef(null);
    const [padreColocado, setPadreColocado] = useState(false);

    // console.log(especie);

    useEffect(() => {
        const initialFetch = async () => {
            if (padre.nombre) { // Check if padre has a name (indicates initial value)
                setLoading(true);
                try {
                    const response = await axios.get(`/bloquetaxonomico/search/${padre.nombre}?tipo='genero'`); 
                    setBloquesPadreOptions(response.data);
                    setData('id_bloque_padre', padre.id_bloque)
            } catch (error) {
            } finally {
              setLoading(false);
            }
          }
        };
        initialFetch();
      }, [padre]);

    const handleInputChange = (event, value) => {
        //console.log(data.id_bloque_padre);

        if (value.length > 0 && value != padre.nombre) {
            setData('id_bloque_padre', '');
            setLoading(true);
            fetch(`/bloquetaxonomico/search/${value}?tipo='genero'`) // Replace with your API endpoint
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

    const { data, setData, patch, errors, processing } = useForm({
        nombre: especie.nombre,
        nombre_comun: especie.nombre_comun,
        descripcion: especie.descripcion,
        id_bloque_padre: padre.id_bloque, // nullable, so initially empty
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('especie.update', especie.id_especie));
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Editar especie
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
                            value={padreColocado ? bloquesPadreOptions.find(option => option.id_bloque === data.id_bloque_padre) || null : padre}
                            getOptionLabel={(option) => option.nombre || ""}
                            isOptionEqualToValue={(option, value) => option.id_bloque === value.id_bloque}
                            onChange={(event, newValue) => {
                                setData('id_bloque_padre', newValue ? newValue.id_bloque : '');
                                setPadreColocado(true); // Set flag to avoid re-rendering issues
                            }}
                            onInputChange={handleInputChange} // Handles keystroke changes
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
                                    ref = {autoCompleteRef}
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

Edit.layout = (page) => <Layout children={page} title="Crear especie" />;
export default Edit;
