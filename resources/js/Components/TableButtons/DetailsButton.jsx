import InfoIcon from '@mui/icons-material/Info';
import { Button } from '@mui/material';
import { Link, router} from '@inertiajs/react';


const DetailsButton = ({ruta, parametros}) => {
    return (    
        <Button
            variant="contained"
            color="primary"
            component={Link}
            href={route(ruta, parametros)}>
                <InfoIcon/>
        </Button>
    )
}

export default DetailsButton;