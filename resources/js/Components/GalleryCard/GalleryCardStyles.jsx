export const galleryCardStyles = {
    'card': {
        margin: {xs:'5px' , md:'20px'},
        padding: '0',
        width: {
            xs:'90vw',
            md:'330px'
        }
    },
    'cardContent': {
        display: 'flex',
        alignItems:'center',
        flexWrap: 'wrap',
        justifyContent: {xs:'stretch', md:'center'},
        flexDirection:{
            xs:'row',
            md:'column'
        },
        padding: '0'
    },
    'nameWrap': {
        textAlign:'left',
        margin: '5%',
        width: '100%',
        fontWeight: 'bold',
    },
    'name':{
        fontWeight: 'bold',
        fontSize:{xs:'1rem'},
    },
    'descriptionWrap': {
        height: '10vh',
        textAlign: 'left',
        width: {
            xs:'50vw',
            md:'90%'
        },
        margin: '5%',
        overflow:'hidden',
    },
    'description':{
        overflowWrap: 'anywhere'
    },
    'img':{
        height: {xs:'30vw', md:'300px'},
        width: {xs:'30vw', md:'100%'},
        objectFit: 'fill',
        alignSelf:'start'
    }
}