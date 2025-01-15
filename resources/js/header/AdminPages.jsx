const ADMIN_PAGES = [
    {
      etiqueta: "Especie",
      paginas: [
        {
          pagina: "Índice",
          link: route("especie.index"),
          method: "get",
        },
        // {
        //   pagina: "Mostrar",
        //   link: route("especie.show", ":id"), // Replace ":id" with dynamic ID where needed
        //   method: "get",
        // },
        {
          pagina: "Crear",
          link: route("especie.create"),
          method: "get",
        },
        // {
        //   pagina: "Editar",
        //   link: route("especie.edit", ":id"), // Replace ":id" with dynamic ID where needed
        //   method: "get",
        // },
      ],
    },
    {
      etiqueta: "Bloque Taxonómico",
      paginas: [
        {
          pagina: "Índice",
          link: route("bloquetaxonomico.index"),
          method: "get",
        },
        // {
        //   pagina: "Mostrar",
        //   link: route("bloquetaxonomico.show", ":id"), // Replace ":id" with dynamic ID where needed
        //   method: "get",
        // },
        {
          pagina: "Crear",
          link: route("bloquetaxonomico.create"),
          method: "get",
        },
        // {
        //   pagina: "Editar",
        //   link: route("bloquetaxonomico.edit", ":id"), // Replace ":id" with dynamic ID where needed
        //   method: "get",
        // },
      ],
    },
    {
      etiqueta: "Imagen",
      paginas: [
        {
          pagina: "Índice",
          link: route("imagen.index"),
          method: "get",
        },
        // {
        //   pagina: "Mostrar",
        //   link: route("imagen.show", ":id"), // Replace ":id" with dynamic ID where needed
        //   method: "get",
        // },
        {
          pagina: "Crear",
          link: route("imagen.create"),
          method: "get",
        },
        // {
        //   pagina: "Editar",
        //   link: route("imagen.edit", ":id"), // Replace ":id" with dynamic ID where needed
        //   method: "get",
        // },
      ],
    },
  ];

export default ADMIN_PAGES;