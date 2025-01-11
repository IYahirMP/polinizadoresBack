import {ImageList, ImageListItem} from "@mui/material";
import {Paper} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import Error from "./Error";
import API_ENDPOINTS from "../../Config/APISettings";

/**
 * Retorna un componente de galería de imágenes.
 * Maneja los estados de carga satisfactoria y erronea.
 * 
 * @returns 
 */
export default function ImageGallery({styles}){
    //Parametros de URL  
    const {id} = useParams();
    
    // Funcion para solicitar datos a la API
    const retrieveImages = (id)=>{
      return fetch(API_ENDPOINTS.SPECIES_IMAGES(id)).then((data) => data.json(),);
    }

    // Solicitud de datos a la API y asignacion a miembros de datos
    const {isLoading: imagesLoading, error: imageError, data: imageData, isFetching} = useQuery(
      {
        queryKey: ['speciesImage'],
        queryFn: () => retrieveImages(id)
      }
    );

    return (
        //Envoltura
        <Paper elevation={3} sx={styles}>
          {imagesLoading || isFetching ? ( //Si está cargando
            <Loading/>
          ): imageError ? ( // Si hubo un error
          <Error/>
          ): imageData != undefined && ( // Si cargó correctamente
          <ImageList variant="masonry" cols={3} gap={8}>
            
            {/*Galeria de tres columnas*/}
            {imageData.img.map((item) => ( //Por cada imagen en la respuesta, crear un ImageListItem con el enlace
              <ImageListItem key={item}>
                <img
                  srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          )}
        </Paper>
    )
}