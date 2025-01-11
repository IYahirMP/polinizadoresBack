import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';
import API_ENDPOINTS from '../../Config/APISettings';

/**
 * Crea un TreeItem estilizado
 */
const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
    color: // En modo claro
        theme.palette.mode === 'light'
            ? theme.palette.grey[800]
            : theme.palette.grey[200],
    [`& .${treeItemClasses.content}`]: { //Estilos para las clases por defecto de TreeItem
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(0.5, 1),
        margin: theme.spacing(0.2, 0),
        [`& .${treeItemClasses.label}`]: {
            fontSize: '2rem',
            fontWeight: 500,
        },
    },
    [`& .${treeItemClasses.iconContainer}`]: {
        borderRadius: '50%',
        backgroundColor:
            theme.palette.mode === 'light'
                ? alpha(theme.palette.primary.main, 0.25)
                : theme.palette.primary.dark,
        color: theme.palette.mode === 'dark' && theme.palette.primary.contrastText,
        padding: theme.spacing(0, 1.2),
    },
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: 30,
        paddingLeft: 38,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

/**
 * Renderiza un SimpleTreeView con un itemId, eitqueta y contenidos preconfigurado para hacer autoFocus y expandirse.
 * 
 * @param {children} "Contenidos del elemento a renderizar"
 * @param {itemId} "ItemId del CustomTreeItem"
 * @param {label} "Etiqueta a mostrar en la vista jerárquica"  
 * @returns Una vista de árbol que contiene un CustomTreeItem y los contenidos especificados.
 */
const SubTree = ({ children, itemId, label }) => {
    return (
        <SimpleTreeView defaultExpandedItems={['grid']} expandedItems={[itemId]} selectedItems={[itemId]}>
            <CustomTreeItem itemId={itemId} label={label} autoFocus>
                {children}
            </CustomTreeItem>
        </SimpleTreeView>
    );
};

/**
 * Componente recursivo.
 * A partir de un arreglo de la forma [['taxon1', 'nombre1'],['taxon2', 'nombre2'], ...], se renderiza
 * un componente MUI de vista de árbol, expandido y con estado autofocus.
 * 
 * @param {hierarchy} "Arreglo que contiene los taxones a mostrar en orden descendente (A partir del dominio y hasta la especie.)" 
 * @param {begin} "Indice del arreglo hierarchy para el cual se va a renderizar la recursion actual."
 * @returns 
 */
const RecursiveTree = ({hierarchy, begin}) => {
    //Esto se supone que debe comenzar en begin = 0
    let noOfTaxa = hierarchy.length;
    let currentTaxaIndex = begin;

    // Caso base
    // Si se ha llegado al final de la jerarquia, se retorna un elemento sencillo.
    if (currentTaxaIndex === noOfTaxa - 1) {
        return <CustomTreeItem 
            itemId={hierarchy[currentTaxaIndex][0]}
            label={hierarchy[currentTaxaIndex][1]} 
            autoFocus
            />;
    }
    
    // Caso recursivo
    // Si aun hay taxones por mostrar, se crea una nueva vista de arbol 
    // en la siguiente posición del arreglo de taxones 
    return (
        <SubTree 
            itemId={hierarchy[currentTaxaIndex][0]}
            label={hierarchy[currentTaxaIndex][1]}>
            <RecursiveTree hierarchy={hierarchy} begin={currentTaxaIndex + 1}/>
        </SubTree>
    );
};


/**
 * Muestra la vista jerárquica de la taxonomía de la especie usando el componente RecursiveTree
 * y maneja los estados de carga y error.
 * 
 * @returns Vista jerárquica de la taxonomía de la especie. 
 */
export default function SpeciesClassification() {
    const { id } = useParams();

    // Retorna los datos del endpoint de clasificacion.
    const fetchData = () => {
        return fetch(API_ENDPOINTS.SPECIES_CLASSIFICATION(id)).then((res) => res.json(),);
      }
    
      const {error: classError, data: classData, isFetching: classIsFetching, isLoading: classIsLoading} = useQuery(
        {
          queryKey: ['speciesClassification'],
          queryFn: () => fetchData(),
        }
      )

      /**
       * Se crea un arreglo bidimensional con las entradas llave:valor de JSON
       * con elementos [llave, valor].
       * 
       * Se filtran los elementos de tal forma que se suprime el campo id.
       * 
       * Se recibe un JSON como este
       * 
       * {"id": "1", 
        "domain": "Eukaryota", 
        "kingdom": "Animalia", 
        "phylum": "Arthropoda", 
        "class": "Insecta",
        "order": "Lepidoptera",
        "family": "Nymphalidae",
        "genus": "Danaus",
        "species": "Danaus plexippus"}

        Se procesa para convertirse en este arreglo de arreglos
        [
            [
                "domain",
                "Eukaryota"
            ],
                ...
            [
                "species",
                "Danaus plexippus"
            ]
        ]
       */
    let hierarchy = undefined;
    if (classData != undefined && !classError){
        console.log(classData);
        hierarchy = Object.entries(classData).filter(([key, value]) => key !== "id");
        console.log(hierarchy.length)
    }

    /**
     * Renderiza un contenedor. Dentro de este, si la clasificación sigue cargando, carga un mensaje de error.
     * Si la clasificación no ha cargado correctamente, se muestra un mensaje de error.
     * Si la clasificación se carga correctamente y existen datos, entonces se crea un elemento de tipo RecursiveTree
     * con esta información.
     * 
     * 
     */
    return (
        <Box sx={{ minHeight: '70vh', minWidth: '90vw' }}>
            {classIsLoading ? (
                <Loading/>
            ): classError ? (
                <Error/>
            ): classData != undefined && hierarchy != undefined && (
            <RecursiveTree hierarchy={hierarchy} begin={0}/>
            )}
        </Box>
    );
}
