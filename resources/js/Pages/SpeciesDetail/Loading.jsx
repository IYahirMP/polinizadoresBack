import { Box, Typography } from "@mui/material";

/**
 * Renderiza un componente sencillo con la leyenda "Cargando..."
 * 
 * @returns Componente Loading
 */
export default function Loading(){
    return (
        <Box height={'100%'} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        {/* Wrapper para la tipografia*/}
            <Typography variant="h4" textAlign={'center'}>Cargando...</Typography> {/* Leyenda: Cargando... */}
        </Box>
    )
  };