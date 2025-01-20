import React from 'react';
import { Link } from '@inertiajs/react';
import Layout from '../Layout';
import { API_ENDPOINTS } from '@/Config/APISettings';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid2 as Grid,
  Button,
  Box,
  Paper,
  Divider,
} from '@mui/material';

const Show = ({ observacion, inicio_deteccion, fin_deteccion, imagen }) => {
  const resProps = {display:{xs:'block', md:'inline-block'}, marginX:'10px'};
  const lugar = observacion.lugar;

  const mapProps = {
    "ancho": 400,
    "alto": 400,
    "latitud": lugar.latitud,
    "longitud": lugar.longitud,
    "zoom": 2,
    "alt": imagen.descripcion,
  }

  const urlMap = API_ENDPOINTS.MAPS.getStaticMap(
    mapProps.latitud, mapProps.longitud, mapProps.zoom, mapProps.ancho, mapProps.alto
  )

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Detalles de la Observación
      </Typography>

      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid container size={{xs:12, sm:4}} sx={{height:{md:'200px'}}}>
              <Grid size={12}>
                <Typography variant={'h6'} sx={resProps}>ID:</Typography>
                <Typography sx={resProps}>{observacion.id_observacion}</Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="h6" sx={resProps}>Inicio de Detección:</Typography>
                <Typography sx={resProps}>{inicio_deteccion}</Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="h6" sx={resProps}>Fin de Detección:</Typography>
                <Typography sx={resProps}>{fin_deteccion}</Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="h6" sx={resProps}>Duración de Detección:</Typography>
                <Typography sx={resProps}>{observacion.duracion_deteccion} minutos</Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="h6" sx={resProps}>Lugar:</Typography>
                <Typography sx={resProps}>{observacion.lugar.nombre}</Typography>
              </Grid>
            </Grid>
            <Grid size={{xs:12, sm:4}} sx={{
              justifyContent:'center',
              alignItems:'center'
            }}>
              <Grid size={12} minHeight={100}>
                <Typography variant="h6" sx={{textAlign:'center'}}>Especie encontrada</Typography>
                <Typography sx={{textAlign:'center'}}>{observacion.especie.nombre}</Typography>
              </Grid>
              <Grid container size={12} sx={
                {justifyContent:'center'}
              }>
                <Paper variant='elevation'>
                  <img src={imagen.url} alt={imagen.descripcion} className="object-fill"/>
                </Paper>
              </Grid>
            </Grid>
            <Grid size={{xs:12, sm:4}} sx={{
              justifyContent:'center',
              alignItems:'center'
            }}>
              <Divider/>
              <Grid size={12} minHeight={'20vh'}>
                <Typography variant="h6" sx={{textAlign:'center'}}>Lugar de la observación</Typography>
                <Typography sx={{textAlign:'center'}}>{`${lugar.nombre}`}</Typography>
                <Typography sx={{textAlign:'center'}}>{`${lugar.municipio}, ${lugar.estado}`}</Typography>
                <Typography sx={{textAlign:'center'}}>{lugar.referencias}</Typography>
              </Grid>
              <Grid container size={12} sx={
                {paddingY:'25px', justifyContent:'center'}
              }>
                <Paper variant='elevation'>
                  <img src={urlMap} alt={mapProps.alt} height={mapProps.alto} width={mapProps.ancho}/>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box mt={4} display="flex" justifyContent="space-between">
        <Button component={Link} href={route('observaciones.index')} variant="outlined" color="secondary">
          Volver
        </Button>
        <Button
          component={Link}
          href={route('observaciones.edit', observacion.id_observacion)}
          variant="contained"
          color="primary"
        >
          Editar
        </Button>
      </Box>
    </Container>
  );
};

Show.layout = (page) => <Layout children={page} title="Detalles de la observación"></Layout>;

export default Show;
