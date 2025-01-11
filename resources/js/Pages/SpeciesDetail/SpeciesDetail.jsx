import { useState } from "react"; // Hook para manejar el estado en componentes funcionales de React
import { useParams } from "react-router-dom"; // Hook para obtener parámetros de la URL
import { useQuery } from "@tanstack/react-query"; // Hook para manejar solicitudes asíncronas
import { useTheme } from "@emotion/react"; // Hook para acceder al tema de Material-UI
import CustomTabPanel from "../../Components/Tabs/CustomTabPanel.jsx"; // Componente personalizado para pestañas
import Tabs from '@mui/material/Tabs'; // Componente de pestañas de Material-UI
import Tab from '@mui/material/Tab'; // Componente individual de pestaña de Material-UI
import Box from '@mui/material/Box'; // Contenedor Box de Material-UI
import { Typography } from "@mui/material"; // Componente de texto para mostrar mensajes de carga o error
import SpeciesDataTab from "./SpeciesDataTab.jsx"; // Componente que muestra la información general de una especie
import SpeciesVisualization from "./SpeciesVisualization.jsx"; // Componente que visualiza los datos de una especie
import SpeciesClassification from "./SpeciesClassification.jsx"; // Componente para mostrar la clasificación de una especie
import API_ENDPOINTS from "../../Config/APISettings.jsx"; // Endpoints de la API

function a11yProps(index) { // Función para generar atributos ARIA para las pestañas
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SpeciesDetail() { // Componente principal que muestra los detalles de una especie
  const [value, setValue] = useState(0); // Estado para almacenar el índice de la pestaña activa
  const theme = useTheme().speciesDetails; // Tema específico para los detalles de las especies
  const { id } = useParams(); // Obtiene el ID de la especie desde la URL

  const fetchData = (id) => {
    return fetch(API_ENDPOINTS.SPECIES_DETAIL(id)).then((res) => res.json(),); // Función para obtener los datos detallados de una especie
  }

  const {error, data, isFetching, isLoading} = useQuery(
    {
      queryKey: ['speciesData'], // Clave única para identificar la consulta
      queryFn: () => fetchData(id), // Función que realiza la solicitud de los datos detallados de una especie
    }
  )

  const handleChange = (event, newValue) => { // Manejador de cambios en las pestañas
    setValue(newValue);
  };

  return (
    <Box> {/* Contenedor Box principal */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>      {/* Contenedor Box para el componente Tabs */}
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"> {/* Componente Tabs con atributos ARIA */}
          <Tab label="Informacion general" {...a11yProps(0)} />   {/* Pestaña de información general */}
          <Tab label="Visualizaciones" {...a11yProps(1)} />       {/* Pestaña de visualización */}
          <Tab label="Mapa" {...a11yProps(2)} />                  {/* Pestaña de mapa */}
          <Tab label='Clasificacion' {...a11yProps(3)}></Tab>     {/* Pestaña de clasificación */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}> {/* Panel de pestañas para la información general */}
        <Box>
          {isLoading ? (
            <Typography variant="h2">Aun no hay datos.</Typography> // Mensaje mientras se carga
          ): error ? (
            <Typography variant="h2">Ha ocurrido un error al solicitar los datos del servidor.</Typography> // Mensaje de error
          ): data != undefined && (
          <SpeciesDataTab species={data.species} description={data.description} /> // Componente que muestra la información general de una especie
          )}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}> {/* Panel de pestañas para las visualizaciones */}
        <Box width={"100%"} height={"100%"}>
          {isLoading ? (
            <Typography variant="h2">Aun no hay datos.</Typography> // Mensaje mientras se carga
          ): error ? (
            <Typography variant="h2">Ha ocurrido un error al solicitar los datos del servidor.</Typography> // Mensaje de error
          ): data != undefined && (
            <SpeciesVisualization species={data.species} styles={{...theme.bigGraph}}/> // Componente que visualiza los datos de una especie
          )}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}> {/* Panel de pestañas para el mapa */}
        <Box sx={{ ...theme.map }}> {/* Contenedor Box con estilos específicos */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7573.104370379918!2d-100.67698639037201!3d18.36770337550166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332c4eeb361b65%3A0x5ccd10556cf552d9!2sInstituto%20Tecnol%C3%B3gico%20de%20Cd.%20Altamirano!5e0!3m2!1ses-419!2smx!4v1722530727436!5m2!1ses-419!2smx" width="1450" height="600" border='0' allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> {/* Mapa embebido */}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}> {/* Panel de pestañas para la clasificación */}
        <Box sx={{ ...theme.map }}> {/* Contenedor Box con estilos específicos */}
          <SpeciesClassification/> {/*Componente que muestra la clasificación de una especie*/}
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
