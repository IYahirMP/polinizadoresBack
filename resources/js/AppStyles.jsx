import { createTheme } from "@mui/material";
import { galleryStyles } from "./Pages/Gallery/GalleryStyles";
import { headerStyles } from "./header/HeaderStyles";
import { speciesDetailStyles } from "./Pages/SpeciesDetail/SpeciesDetailStyles";
import { galleryCardStyles } from "./Components/GalleryCard/GalleryCardStyles";
import { esES as ESGeneral} from "@mui/material/locale";
import {esES as ESDataGrid} from "@mui/x-data-grid/locales"

export const theme = createTheme({
    menu: headerStyles,
    gallery: galleryStyles,
    galleryCard: galleryCardStyles,
    speciesDetails: speciesDetailStyles,
  }, 
  ESGeneral,
  ESDataGrid
);