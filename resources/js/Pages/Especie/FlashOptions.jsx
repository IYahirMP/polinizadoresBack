export const FLASH_OPTIONS = {
    "destroy":{
        "ok":{
            "message": "La especie ha sido eliminada",
            "header": "Eliminación exitosa",
            "color": "Green"
        },
        "bad":{
            "message": "Por favor, verifica que no haya observaciones dependientes de esa especie",
            "header": "Error",
            "color": "Red"
        }
    },
    "create":{
        "ok":{
            "message": "La especie ha sido creada exitosamente",
            "header": "Creación exitosa",
            "color": "Green"
        },
        "bad":{
            "message": "La especie no pudo ser creada.",
            "header": "Error",
            "color": "Red"
        }
    },
    "update":{
        "ok":{
            "message": "La especie ha sido modificada correctamente",
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