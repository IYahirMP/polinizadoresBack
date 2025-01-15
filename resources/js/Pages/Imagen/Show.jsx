import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import { Grid2 as MuiGrid } from "@mui/material";
import Layout from "../Layout";
import { Link } from "@inertiajs/react";

const AtributoSimple = ({etiqueta, dato, esBloque}) => {
  return (
    <Box sx={{margin:'20px'}}>
      <Typography variant="h5" sx={{fontWeight:"bold", display:"inline-block"}}>
        {etiqueta}
      </Typography>
      <Typography variant="h6" sx={
        {
            marginLeft: esBloque ? '20px' : '30px', 
            display:esBloque ? 'block' : 'inline-block'
        }}>
        {dato}
      </Typography>
    </Box>
  );
}

const Show = ({imagen, url, especie}) => {

  return (
    <Box p={3}>
      <MuiGrid container spacing={6}>
        {/* Left side: Form */}
        <MuiGrid size={{xs:12, md:6}}>
          <Typography variant="h4" gutterBottom sx={{
            marginBottom: '30px',
            marginLeft: '10px'
          }}>
            Detalles de la imagen
          </Typography>

          <Link href={route('especie.show', especie.id_especie)}>
            <AtributoSimple etiqueta={"Especie"} dato={especie.nombre} esBloque={false}/>
          </Link>
          <AtributoSimple etiqueta={"Descripcion"} dato={imagen.descripcion} esBloque={true}/>

          
        </MuiGrid>

        <MuiGrid size={{xs:12, md:6}} style={{ textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Imagen registrada
          </Typography>
            <img
              src={url}
              alt="Cropped"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
              className="place-self-center"
            />
        </MuiGrid>
      </MuiGrid>
    </Box>
  );
};

Show.layout = (page) => <Layout children={page} title="Taxones"></Layout>;
export default Show;
