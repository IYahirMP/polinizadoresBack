import { useTheme } from "@mui/material"
import {Container, Box, Typography} from "@mui/material";
import GalleryCard from "../../Components/GalleryCard/GalleryCard";
import { useEffect, useState } from "react";
import {Pagination} from "@mui/material";
import Layout from "../Layout";
import './cssReset.css';

const Gallery = ({requestOk, especies, auth}) => {
    const theme = useTheme();
    const [page, setPage] = useState(1);
    const [especiesActuales, setEspeciesActuales] = useState([]);

    const paginas = Math.floor((especies.length - 1)/ 10);

    useEffect(() => {
        let i = 0;
        let especiesNuevas = [];

        for(i = 0; i < 10; i++){
            if (page * 10 + i === especies.length) {
                break;
            }
            especiesNuevas[i] = especies[page * 10 + i];
        }

        setEspeciesActuales(especiesNuevas);
    }, [page])


    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    }

    // console.log(especies);

    const titleGarden = 'Jardin de Polinizadores del Instituto Tecnológico de Ciudad Altamirano';
    return (
    <Container maxWidth='xlg' disableGutters>
        <Box sx={{...theme.gallery.presentation}}>
            <Typography variant='h2' sx={{...theme.gallery.presentationText}}>{titleGarden}</Typography>
        </Box>
                {especies != undefined && especiesActuales.length != 0 ? (
                <>
                    <Box sx={{padding:'5vh', textAlign:'center'}}>
                        <Typography variant='h3' sx={{...theme.gallery.titleText}}>Especies encontradas</Typography>
                    </Box>
                    <Box {...theme.gallery.cardBox}>
                        {especiesActuales.map(
                        (card) => <GalleryCard 
                        key={card.id_especie} 
                        id={card.id_especie} 
                        title={card.nombre} 
                        description={card.descripcion} 
                        img={card.url}
                        />)}
                    </Box>
                </>
            ) : requestOk ? (
                <Box {...theme.gallery.cardBox}>
                    <Typography variant="h3">No se han encontrado especies</Typography>
                </Box>
            ) : (
                <Box {...theme.gallery.cardBox}>
                    <Typography variant="h3">Ha ocurrido un error al solicitar los datos del servidor</Typography>
                </Box>
            )
        }
        
        
        {especies != undefined ?(
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Box {...theme.gallery.pagination}>
                    <Typography variant="body2">Página actual: {page}</Typography>
                    <Pagination count={paginas} page={page} onChange={handlePageChange}/>
                </Box>
            </Box>
            ) : null
        }
    </Container>
    );
};

Gallery.layout = (page) => <Layout children={page} title="Galeria"></Layout>;
export default Gallery;