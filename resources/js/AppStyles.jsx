import { createTheme } from "@mui/material";
import { galleryStyles } from "./Pages/Gallery/GalleryStyles";
import { headerStyles } from "./header/HeaderStyles";
import { speciesDetailStyles } from "./Pages/SpeciesDetail/SpeciesDetailStyles";
import { galleryCardStyles } from "./Components/GalleryCard/GalleryCardStyles";

export const theme = createTheme({
    menu: headerStyles,
    gallery: galleryStyles,
    galleryCard: galleryCardStyles,
    speciesDetails: speciesDetailStyles,
  });