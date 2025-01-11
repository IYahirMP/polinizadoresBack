// Endpoints de la API

const env = import.meta.env;

const API_BASE_URL = env.PROD ? env.VITE_API_URL_PROD : env.VITE_API_URL_DEV;

const API_ENDPOINTS = {
    SPECIES: (page) => `${API_BASE_URL}/species?_page=${page}&_per_page=10`,
    SPECIES_IMAGES: (id) => `${API_BASE_URL}/species-images/${id}`,
    SPECIES_CLASSIFICATION: (id) => `${API_BASE_URL}/classification/${id}`,
    SPECIES_DETAIL: (id) => `${API_BASE_URL}/species/${id}`,
    SPECIES_GRAPH_MONTH: (id) => `${API_BASE_URL}/graph-by-month/${id}`,
};

export default API_ENDPOINTS;