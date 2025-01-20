import { Delete, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link, router} from '@inertiajs/react';


const EditButton = ({ruta, parametros}) => {
    return <Button
        variant="contained"
        color="primary"
        component={Link}
        href={route(ruta, parametros)}
        >
        <Edit />
    </Button>   
}

export default EditButton;