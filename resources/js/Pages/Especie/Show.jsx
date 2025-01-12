import React from 'react';
import { Box, Button, Typography, Stack, Card, CardContent, Divider } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from '@inertiajs/react';
import Layout from '../Layout';
import RecursiveTree from '../SpeciesDetail/RecursiveTree';

const DataBox = ({ titulo, info, link }) => {
  return (
    <Box className="p-3">
      <Typography variant="h6" color="text.primary" fontWeight={'800'}>
        {titulo}
      </Typography>
      {link !== undefined ? (
        <Link href={link}>
          <Typography variant="body1">{info}</Typography>
        </Link>
      ) : (
        <Typography variant="body1">{info}</Typography>
      )}
    </Box>
  );
};

const Show = ({ especie, jerarquia}) => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Detalles de la Especie
      </Typography>

      <Box mb={2}>
        <div className="mr-5 inline-block">
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBack />}
            component={Link}
            href={route('especie.index')}
          >
            Regresar al índice
          </Button>
        </div>
        <div className="inline-block">
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            component={Link}
            href={route('especie.edit', especie.id_especie)}
          >
            Editar
          </Button>
        </div>
      </Box>

      <Card variant="outlined">
        <CardContent>
          <Box className="p-3 flex flex-col justify-center md:flex-row md:justify-around">
            <DataBox titulo="ID de la Especie:" info={especie.id_especie} />
            <Divider className="xs:invisible" />
            <DataBox titulo="Nombre Científico:" info={especie.nombre || 'No disponible'} />
            <Divider className="xs:invisible" />
            <DataBox
              titulo="Nombre Común:"
              info={especie.nombre_comun || 'No disponible'}
            />
          </Box>
          <Divider />

          <Box className="p-3 flex flex-col justify-center md:flex-row md:justify-around">
            <DataBox
              titulo="Creado:"
              info={new Date(especie.created_at).toLocaleString()}
            />
            <Divider className="xs:invisible" />
            <DataBox
              titulo="Actualizado:"
              info={new Date(especie.updated_at).toLocaleString()}
            />
          </Box>
        </CardContent>
      </Card>

      {jerarquia != undefined && (
        <Card variant='outlined' className='mt-10'>
          <Box className="flex justify-around ml-10" id={"myid"}>
            <Box>
            <Typography variant='h5' sx={
            {
              margin:'20px'  
            }
          }>Árbol taxonómico</Typography>
              <RecursiveTree begin={0} hierarchy={jerarquia}/>
            </Box>
            <Box sx={{height:"50vh", width:"45vw", border:"2px solid black", margin:'25px'}}>
            </Box>
          </Box>
        </Card>
      )}
    </Box>
  );
};

Show.layout = (page) => <Layout children={page} title="Detalles de la Especie" />;
export default Show;
