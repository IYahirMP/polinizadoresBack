import { useTheme } from "@mui/material"
import {Container, Box, Typography} from "@mui/material";
import GalleryCard from "../../Components/GalleryCard/GalleryCard";
import { useState } from "react";
import {Pagination} from "@mui/material";

export default function Gallery ({requestOK}){
    const theme = useTheme();
    const [page, setPage] = useState(1);


    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    }

    let data = undefined;

    const titleGarden = 'Jardin de Polinizadores del Instituto Tecnológico de Ciudad Altamirano';
    return (
    <Container maxWidth='xlg' disableGutters>
        <Box sx={{...theme.gallery.presentation}}>
            <Typography variant='h2' sx={{...theme.gallery.presentationText, md:{fontSize:'10px'}}}>{titleGarden}</Typography>
        </Box>
                {data != undefined ? (
                <>
                    <Box sx={{padding:'5vh', textAlign:'center'}}>
                        <Typography variant='h3'>Especies encontradas</Typography>
                    </Box>
                    <Box {...theme.gallery.cardBox}>
                        {data.data.map(
                        (card) => <GalleryCard 
                        key={card.id} 
                        id={card.id} 
                        title={card.species} 
                        description={card.description} 
                        img={card.img}
                        />)}
                    </Box>
                </>
            ) : requestOK ? (
                <Box {...theme.gallery.cardBox}>
                    <Typography variant="h3">No se han encontrado especies</Typography>
                </Box>
            ) : (
                <Box {...theme.gallery.cardBox}>
                    <Typography variant="h3">Ha ocurrido un error al solicitar los datos del servidor</Typography>
                </Box>
            )
        }
        
        
        {requestOK && data != undefined ?(
            <Box sx={{display:'flex', justifyContent:'center'}}>
                <Box {...theme.gallery.pagination}>
                    <Typography variant="body2">Página actual: {page}</Typography>
                    <Pagination count={10} page={page} onChange={handlePageChange}/>
                </Box>
            </Box>
            ) : null
        }
    </Container>
    );
};