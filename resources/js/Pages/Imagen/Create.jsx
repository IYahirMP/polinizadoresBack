import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  Typography,
  Slider,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Grid2 as MuiGrid } from "@mui/material";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropImageHelper";
import { useForm } from "@inertiajs/react";
import Layout from "../Layout";

const Create = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    id_especie: "",
    image: null,
    description: "",
  });

  const [bloquesPadreOptions, setBloquesPadreOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const [croppedImagePreview, setCroppedImagePreview] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [openCropDialog, setOpenCropDialog] = useState(false);

  const handleInputChange = (event, value) => {
    if (value.length > 0) {
      setData("id_especie", "");
      setLoading(true);
      fetch(`/especie/search/${value}`)
        .then((response) => response.json())
        .then((data) => {
          setBloquesPadreOptions(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setBloquesPadreOptions([]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("image", file);

      let a = URL.createObjectURL(file);

      setImagePreview(a);
      setOpenCropDialog(true);
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      const croppedImage = await getCroppedImg(imagePreview, croppedAreaPixels);

      // Set the cropped image preview
      setCroppedImagePreview(URL.createObjectURL(croppedImage));

      console.log(croppedImage);
      // Convert cropped image to a Blob/File object
      const file = new File([croppedImage], "cropped-image.jpg", { type: "image/jpeg" });
      setData("image", file);

      setOpenCropDialog(false);
    } catch (error) {
      console.error("Error recortando la imagen:", error);
      alert("Fallo al procesar la imagen.");
    }
  };

  const handleSubmit = () => {
    // Here, you can submit the data (including the image) to the server
    post(route('imagen.store'), {
      onSuccess: () => {
        reset(); // Reset the form after successful submission
      },
      onError: (error) => {
        console.error(error);
      }
    });
  };

  return (
    <Box p={3}>
      <MuiGrid container spacing={6}>
        {/* Left side: Form */}
        <MuiGrid size={{xs:12, md:6}}>
          <Typography variant="h4" gutterBottom sx={{
            marginBottom: '30px',
            marginLeft: '10px'
          }}>
            Añadir imagen
          </Typography>
{/* 
          <TextField
            label="Species ID"
            variant="outlined"
            value={data.species_id}
            onChange={(e) => setData("species_id", e.target.value)}
            error={!!errors.species_id}
            helperText={errors.species_id}
            fullWidth
            margin="normal"
          /> */}

          <Autocomplete
            fullWidth
            options={bloquesPadreOptions}
            getOptionLabel={(option) => `${option.nombre}: ${option.id_especie}` || ""}
            value={bloquesPadreOptions.find((option) => option.id_especie === data.id_especie) || null}
            isOptionEqualToValue={(option, value) => option.id_especie === value.id_especie}
            onChange={(event, newValue) => {
              setData("id_especie", newValue ? newValue.id_especie : "");
            }}
            onInputChange={handleInputChange}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                label="Especie"
                error={!!errors.id_bloque_padre}
                helperText={"Especie a la que corresponde la imagen"}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading && <CircularProgress color="inherit" size={20} />}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            loading={loading}
            noOptionsText="No se encontraron resultados"
          />

          <TextField
            label="Image Description (ALT Text)"
            variant="outlined"
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            margin="normal"
          />

          <Box sx={{marginTop:'70px'}}>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="upload-image"
            />
            <label htmlFor="upload-image">
                <Button variant="contained" component="span">
                Cargar imagen
                </Button>
            </label>

            {/* Submit button to send data to the server */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={processing || !data.image}
                style={{ marginLeft: 16 }}
            >
                Guardar
            </Button>    
          </Box>
          
        </MuiGrid>

        {/* Right side: Cropped image preview */}
        <MuiGrid size={{xs:12, md:6}} style={{ textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Previsualización
          </Typography>
          {croppedImagePreview ? (
            <img
              src={croppedImagePreview}
              alt="Cropped"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
              className="place-self-center"
            />
          ) : (
            <Typography color="textSecondary">No image cropped yet</Typography>
          )}
        </MuiGrid>
      </MuiGrid>

      <Dialog open={openCropDialog} onClose={() => setOpenCropDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Crop Image</DialogTitle>
        <DialogContent>
          <Box position="relative" width="100%" height={400}>
            {imagePreview && (
              <Cropper
                image={imagePreview}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </Box>
          <Box mt={2}>
            <Typography gutterBottom>Zoom</Typography>
            <Slider value={zoom} min={1} max={3} step={0.1} onChange={(e, value) => setZoom(value)} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCropDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary" disabled={processing}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

Create.layout = (page) => <Layout children={page} title="Taxones"></Layout>;
export default Create;
