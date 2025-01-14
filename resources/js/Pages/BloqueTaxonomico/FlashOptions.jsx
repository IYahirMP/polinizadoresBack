export const FLASH_OPTIONS = {
    "destroy":{
        "ok":{
            "message": "El taxón ha sido eliminado",
            "header": "Eliminación exitosa",
            "color": "Green"
        },
        "bad":{
            "message": "Por favor, verifica que no haya especies dependientes de este taxón",
            "header": "Error",
            "color": "Red"
        }
    },
    "create":{
        "ok":{
            "message": "El taxón ha sido creado exitosamente",
            "header": "Creación exitosa",
            "color": "Green"
        },
        "bad":{
            "message": "El taxón no pudo ser creado.",
            "header": "Error",
            "color": "Red"
        }
    },
    "update":{
        "ok":{
            "message": "El taxón ha sido modificado correctamente",
            "header": "Modificación exitosa",
            "color": "Green"
        },
        "bad":{
            "message": "Por favor, verifica que los datos ingresados sean correctos y que el genero seleccionado exista.",
            "header": "Error",
            "color": "Red"
        }
    },
}