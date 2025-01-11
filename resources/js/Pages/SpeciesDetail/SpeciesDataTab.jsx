import {Box, Typography} from "@mui/material"; // Importa componentes Box y Typography de Material-UI
import SpeciesVisualization from "./SpeciesVisualization.jsx"; // Componente que visualiza los datos de una especie
import ImageGallery from "./ImageGallery.jsx"; // Componente que muestra una galería de imágenes
import { useTheme } from "@emotion/react"; // Hook para acceder al tema de Material-UI

export default function SpeciesDataTab ({ species, description }) { // Componente que muestra la información general y los datos visuales de una especie
    const theme = useTheme().speciesDetails; // Tema específico para los detalles de las especies
  
    return (
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        {/* Contenedor Box principal con flexbox y alineación al centro */}
        <Box>
          {/* Contenedor Box para mostrar el nombre y la descripción de la especie */}
          <Typography variant="h2" sx={{ ...theme.name }}>{species}</Typography> {/* Texto del nombre de la especie con estilo */}
          <Typography variant="body1" sx={{ ...theme.description }}>{description}</Typography> {/* Texto de la descripción de la especie con estilo */}
        </Box>
        {/* Contenedor Box para mostrar la galería de imágenes y el gráfico de datos de la especie */}
        <Box sx={{ ...theme.wrap }}>
          <ImageGallery styles={ {...theme.imageSet} }/> {/* Componente ImageGallery con estilos específicos */}
          <SpeciesVisualization species={species} styles={{...theme.graph}}/> {/* Componente SpeciesVisualization con estilos específicos */}
        </Box>
      </Box>
    );
  };
