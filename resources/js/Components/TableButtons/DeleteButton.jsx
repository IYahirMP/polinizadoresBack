import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link, router} from '@inertiajs/react';


const DeleteButton = ({ruta, id}) => {
    const handleDelete = (id) => {
            if (confirm('Estás seguro de que deseas eliminar este elemento?')) {
                router.delete(route(ruta, id), {});
            }
        };

    return (    
        <Button
        variant="contained"
        color="error"
        onClick={() => handleDelete(id)}>
            <Delete />
        </Button>
    )
}

export default DeleteButton;