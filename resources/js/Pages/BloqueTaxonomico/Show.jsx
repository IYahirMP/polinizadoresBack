import React from 'react';
import { Box, Button, Typography, Stack, Card, CardContent, Divider, Container, List, TableRow, Table, TableHead, TableCell, TableBody } from '@mui/material';
import { ArrowBack,} from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from '@inertiajs/react';
import Layout from '../Layout';
import InfoIcon from '@mui/icons-material/Info';


const DataBox = ({titulo, info, link}) => {
  return (
    <Box className="p-3">
      <Typography variant="h6" color="text.primary" fontWeight={'800'}>
        {titulo}
      </Typography>
      {link != undefined ? (
        <Link href={link}><Typography variant="body1">{info}</Typography></Link>
      ):<Typography variant="body1">{info}</Typography> }
    </Box>
    )
}

const Show = ({ bloque, bloquePadre, descendientesDirectos, tieneDescendientes }) => {
  const rutaDescendientes = (bloque.tipo_bloque == "Género") ? 'especie.show': 'bloquetaxonomico.show';

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Detalles del taxón
      </Typography>

      <Box mb={2}>
        <div className={"mr-5 inline-block"}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBack />}
            component={Link}
            href={route('bloquetaxonomico.index')}
          >
            Regresar al índice
            </Button>
        </div>
        <div className={" inline-block"}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            component={Link}
            href={route('bloquetaxonomico.edit', bloque.id_bloque)}
          >
            Editar
          </Button>
        </div>
        
      </Box>

      <Card variant="outlined">
        <CardContent>
            <Box className="p-3 flex flex-col justify-center md:flex-row md:justify-around">
              <DataBox titulo={"Id:"} info={bloque.id_bloque}/>
              <Divider className="xs:invisible"/>

              {bloquePadre != undefined ?(
                <DataBox titulo={"Bloque padre:"} info={bloquePadre.nombre} link={route('bloquetaxonomico.show', bloquePadre.id_bloque)}/>
              ): (
                <DataBox titulo={"Bloque padre:"} info={'Ninguno'}/>
              )
              }

              
              <Divider className="xs:invisible"/>
              <DataBox titulo={"Tipo Bloque:"} info={bloque.tipo_bloque}/>
              <Divider className="xs:invisible"/>
              <DataBox titulo={"Nombre:"} info={bloque.nombre}/>
            </Box>
            <Divider />

            
            <Box className="p-3 flex flex-col justify-center md:flex-row md:justify-around">
              <DataBox titulo="Descripcion:" info={bloque.descripcion || 'No description available'} />
              <Divider className="xs:invisible"/>
              <DataBox titulo="Creado:" info={new Date(bloque.created_at).toLocaleString()} />
              <Divider className="xs:invisible"/>
              <DataBox titulo="Actualizado:" info={new Date(bloque.updated_at).toLocaleString()} />
              <Divider className="xs:invisible"/>
            </Box>
        </CardContent>
      </Card>

      {descendientesDirectos != undefined && tieneDescendientes &&(
        <Card className="mt-10 p-10">
        <Typography variant="h6">Descendientes directos</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre del taxón</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Detalles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            descendientesDirectos.map((a) => {
              return( 
              <TableRow key={a.id_bloque}>
                <TableCell>{a.nombre}</TableCell>
                <TableCell>{a.descripcion}</TableCell>
                <TableCell><Link href={route(rutaDescendientes, a.id_bloque)}><InfoIcon/></Link></TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
      </Card>
      )}
    </Box>
  );
};

Show.layout = (page) => <Layout children={page} title="Bloque Details" />;
export default Show;
