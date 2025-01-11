import { useQuery } from "@tanstack/react-query"; // Hook para manejar solicitudes asíncronas
import { Paper } from "@mui/material"; // Componente de Paper de Material-UI
import { Graph } from "../../Components/GalleryCard/Graph/Graph"; // Componente de gráfico personalizado
import { useParams } from "react-router-dom"; // Hook para obtener parámetros de la URL
import Error from "./Error"; // Componente que se muestra cuando ocurre un error
import Loading from "./Loading"; // Componente de carga mientras se realizan las solicitudes
import API_ENDPOINTS from "../../Config/APISettings"; // Endpoints de la API

export default function SpeciesVisualization({species, styles}){ // Componente principal que visualiza los datos de una especie
    const {id} = useParams(); // Obtiene el ID de la especie desde la URL

    const retrieveGraphData = (id) => {
        return fetch(API_ENDPOINTS.SPECIES_GRAPH_MONTH(id)).then((data) => data.json(),); // Función para obtener los datos del gráfico de una especie
      }

    const {isLoading: graphLoading, error: graphError, data: graphData, isFetching} = useQuery({
      queryKey: ['speciesGraph'], // Clave única para identificar la consulta
      queryFn: () => retrieveGraphData(id) // Función que realiza la solicitud de los datos del gráfico
    });

    return (
        <Paper sx={styles}> {/* Contenedor Paper con estilos personalizados */}
            {(graphLoading || isFetching ) ? (
                <Loading/> // Componente de carga mientras se realizan las solicitudes
            ) : (graphError) ? (
                <Error/> // Componente que muestra un error si ocurre durante la solicitud
            ) : (graphData != undefined) &&(
                <Graph
                        title={`Detecciones de la especie ${species} durante el año ${graphData.year}`} // Título del gráfico
                        xData={graphData.months} // Datos para el eje X
                        yData={graphData.data} // Datos para el eje Y
                    /> // Componente de gráfico personalizado con los datos obtenidos
            )}
        </Paper>
    );
}
