import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';

const Create = ({ especies, tiempos, lugares }) => {
  const { data, setData, post, errors } = useForm({
    id_especie: '',
    inicio_deteccion: '',
    fin_deteccion: '',
    duracion_deteccion: '',
    id_lugar: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/observacion');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Crear Nueva Observación
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Especie</InputLabel>
              <Select
                value={data.id_especie}
                onChange={(e) => setData('id_especie', e.target.value)}
                error={Boolean(errors.id_especie)}
              >
                <MenuItem value="">
                  <em>Selecciona una especie</em>
                </MenuItem>
                {especies.map((especie) => (
                  <MenuItem key={especie.id_especie} value={especie.id_especie}>
                    {especie.nombre_cientifico}
                  </MenuItem>
                ))}
              </Select>
              {errors.id_especie && (
                <Typography color="error">{errors.id_especie}</Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Inicio de Detección</InputLabel>
              <Select
                value={data.inicio_deteccion}
                onChange={(e) => setData('inicio_deteccion', e.target.value)}
                error={Boolean(errors.inicio_deteccion)}
              >
                <MenuItem value="">
                  <em>Selecciona el tiempo de inicio</em>
                </MenuItem>
                {tiempos.map((tiempo) => (
                  <MenuItem key={tiempo.id_tiempo} value={tiempo.id_tiempo}>
                    {tiempo.fecha_hora}
                  </MenuItem>
                ))}
              </Select>
              {errors.inicio_deteccion && (
                <Typography color="error">{errors.inicio_deteccion}</Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Fin de Detección</InputLabel>
              <Select
                value={data.fin_deteccion}
                onChange={(e) => setData('fin_deteccion', e.target.value)}
                error={Boolean(errors.fin_deteccion)}
              >
                <MenuItem value="">
                  <em>Selecciona el tiempo de fin</em>
                </MenuItem>
                {tiempos.map((tiempo) => (
                  <MenuItem key={tiempo.id_tiempo} value={tiempo.id_tiempo}>
                    {tiempo.fecha_hora}
                  </MenuItem>
                ))}
              </Select>
              {errors.fin_deteccion && (
                <Typography color="error">{errors.fin_deteccion}</Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Duración de Detección (minutos)"
              type="number"
              fullWidth
              value={data.duracion_deteccion}
              onChange={(e) => setData('duracion_deteccion', e.target.value)}
              error={Boolean(errors.duracion_deteccion)}
              helperText={errors.duracion_deteccion}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Lugar</InputLabel>
              <Select
                value={data.id_lugar}
                onChange={(e) => setData('id_lugar', e.target.value)}
                error={Boolean(errors.id_lugar)}
              >
                <MenuItem value="">
                  <em>Selecciona un lugar</em>
                </MenuItem>
                {lugares.map((lugar) => (
                  <MenuItem key={lugar.id_lugar} value={lugar.id_lugar}>
                    {lugar.nombre}
                  </MenuItem>
                ))}
              </Select>
              {errors.id_lugar && (
                <Typography color="error">{errors.id_lugar}</Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">
              Crear
            </Button>
            <Button
              component={Link}
              href="/observacion"
              variant="outlined"
              color="secondary"
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Create;
