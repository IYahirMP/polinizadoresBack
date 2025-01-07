import { Box, Typography } from "@mui/material"

export default function Error() {
    return <Box height={'100%'} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <Typography variant="h4" textAlign={'center'}>Ha ocurrido un error. </Typography>
    </Box>
  };