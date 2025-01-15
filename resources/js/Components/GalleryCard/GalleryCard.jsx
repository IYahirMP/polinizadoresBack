import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from '@inertiajs/react';
import { useTheme } from '@emotion/react';

export default function GalleryCard({ id, title, description, img }) {
    const styles = useTheme().galleryCard;

    return (
        <Card variant="outlined" sx={{ ...styles.card }}>
            <CardContent sx={{ ...styles.cardContent }}>
                <CardMedia
                    component="img"
                    sx={{...styles.img}}
                    image={img}
                />
                <Box sx={{ ...styles.nameWrap }}>
                    <Typography variant='h5' sx={{...styles.name}}>{title}</Typography>
                </Box>

                <Box sx={{ ...styles.descriptionWrap }}>
                    <Typography variant='body2' sx={{...styles.description}}>{String(description)}</Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small"><Link href={route('galeria.show', id)}>Ver más</Link></Button>
            </CardActions>
        </Card>
    );
}