const ADMIN_PAGES = [
    {
      etiqueta: "Especie",
      paginas: [
        {
          pagina: "Índice",
          link: route("especie.index"),
          method: "get",
        },
        {
          pagina: "Crear",
          link: route("especie.create"),
          method: "get",
        },
      ],
    },
    {
      etiqueta: "Observaciones",
      paginas: [
        {
          pagina: "Índice",
          link: route("observaciones.index"),
          method: "get",
        },
        {
          pagina: "Crear",
          link: route("observaciones.create"),
          method: "get",
        },
      ],
    },
    {
      etiqueta: "Lugar",
      paginas: [
        {
          pagina: "Índice",
          link: route("lugar.index"),
          method: "get",
        },
        {
          pagina: "Crear",
          link: route("lugar.create"),
          method: "get",
        },
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
        {
          pagina: "Crear",
          link: route("bloquetaxonomico.create"),
          method: "get",
        },
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
        {
          pagina: "Crear",
          link: route("imagen.create"),
          method: "get",
        },
      ],
    },
  ];

export default ADMIN_PAGES;