// Endpoints de la API

const env = import.meta.env;

const API_BASE_URL = env.PROD ? env.VITE_API_URL_PROD : env.VITE_API_URL_DEV;
const GOOGLE_API = env.VITE_GOOGLE_MAPS_API_KEY;

class ApiEndpoint{
    constructor(baseUrl){
        this.url = baseUrl;
    }

    getApiUrl(page, pageSize, simpleOutput){
        const params = [
            ["page", page != null, `page=${page}`],
            ["pageSize", pageSize != null, `pageSize=${pageSize}`],
            ["simpleOutput", simpleOutput == true, `simple=1`],
        ]

        let firstParam = false;
        let url = new String(this.url);
        for(let i = 0; i < params.length; i++){
            if (firstParam == false && params[i][1]){
                url = `${url}/?${params[i][2]}`;
                firstParam = !firstParam;
            }else if (params[i][1]){
                url = `${url}&${params[i][2]}`;
            }
        }

        return url;
    }
}

class GoogleMapsEndpoint extends ApiEndpoint{
    constructor(apiKey){
        super("https://maps.googleapis.com/maps/api/");
        this.apiKey = apiKey;
    }

    getStaticMap(latitud, longitud, zoom, ancho, alto){
        return `${this.url}staticmap?center=${latitud},${longitud}&zoom=${zoom}&size=${ancho}x${alto}&key=${this.apiKey}`
    }
}

const API_ENDPOINTS = {
    OBSERVACIONES: new ApiEndpoint('api/observaciones'),
    MAPS: new GoogleMapsEndpoint(GOOGLE_API),
    // SPECIES_IMAGES: (id) => `${API_BASE_URL}/species-images/${id}`,
    // SPECIES_CLASSIFICATION: (id) => `${API_BASE_URL}/classification/${id}`,
    // SPECIES_DETAIL: (id) => `${API_BASE_URL}/species/${id}`,
    // SPECIES_GRAPH_MONTH: (id) => `${API_BASE_URL}/graph-by-month/${id}`,
};

export {API_ENDPOINTS, ApiEndpoint};