import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import "./recursivetree.css";


/**
 * Renderiza un SimpleTreeView con un itemId, eitqueta y contenidos preconfigurado para hacer autoFocus y expandirse.
 * 
 * @param {children} "Contenidos del elemento a renderizar"
 * @param {itemId} "ItemId del TreeItem"
 * @param {label} "Etiqueta a mostrar en la vista jerárquica"  
 * @returns Una vista de árbol que contiene un TreeItem y los contenidos especificados.
 */
const SubTree = ({ children, itemId, label }) => {
    return (
        <SimpleTreeView
            sx={
                {backgroundColor:"white"}
            }
            itemChildrenIndentation={'2.5rem'}
            defaultExpandedItems={['grid']} 
            expandedItems={[itemId]} 
            selectedItems={[itemId]}
            disableSelection={true}
            
            >
            <TreeItem 
                itemId={itemId}
                label={label}
                autoFocus
                className="someClass"
                >
                {children}
            </TreeItem>
        </SimpleTreeView>
    );
};

const Label = ({taxa, name}) => <div className="tree-label"><span className="taxa">{taxa}:</span><span className="taxaName">{name}</span></div>;

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

    let taxa = hierarchy[currentTaxaIndex][0];
    let name = hierarchy[currentTaxaIndex][1];

    // Caso base
    // Si se ha llegado al final de la jerarquia, se retorna un elemento sencillo.
    if (currentTaxaIndex === noOfTaxa - 1) {
        return <TreeItem  className="someClass"
            itemId={taxa}
            label={<Label taxa={taxa} name={name}/>} 
            autoFocus
            />;
    }
    
    // Caso recursivo
    // Si aun hay taxones por mostrar, se crea una nueva vista de arbol 
    // en la siguiente posición del arreglo de taxones 
    return (
        <SubTree
            itemId={taxa}
            label={<Label taxa={taxa} name={name}/>}>
            <RecursiveTree hierarchy={hierarchy} begin={currentTaxaIndex + 1}/>
        </SubTree>
    );
};

export default RecursiveTree;