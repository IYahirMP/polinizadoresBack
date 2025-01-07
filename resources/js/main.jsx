import React, { StrictMode } from 'react'; // Importa la biblioteca React
import ReactDOM from 'react-dom/client'; // Importa el módulo para renderizar en el DOM de React

// Importación de componentes y estilos
import Layout from './Pages/Layout.jsx';
import SignIn from './Pages/SignIn/SignIn.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';
import ErrorPage from './Pages/ErrorPage/ErrorPage.jsx';
import { theme } from './AppStyles.jsx'; // Tema para la aplicación
import './main.css'; // Estilos generales de la aplicación

// Importación de fuentes personalizadas
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Importación de módulos para enrutamiento y manejo de estado
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Enrutador de React
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Manejo de estado asíncrono
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"; // Herramienta para depuración

// Importación de componentes adicionales
import Gallery from './Pages/Gallery/Gallery.jsx';
import { ThemeProvider } from '@emotion/react';
import SpeciesDetail from './Pages/SpeciesDetail/SpeciesDetail.jsx';

// Creación del enrutador con las rutas definidas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Componente principal de la aplicación
    errorElement: <ErrorPage />, // Componente que se muestra cuando ocurre un error
    children: [ // Rutas secundarias
      {
        path: "/", // Ruta principal
        element: <Gallery /> // Componente Gallery para mostrar una galería
      },
      {
        path: "galeria", // Ruta con alias 'galeria'
        element: <Gallery /> // Mostrar la galería en este ruteo también
      },
      {
        path: "galeria/:id", // Ruta parametrizada para mostrar detalles de una especie
        element: <SpeciesDetail /> // Componente SpeciesDetail que muestra los detalles
      },
      {
        path: "login", // Ruta para iniciar sesión
        element: <SignIn /> // Componente SignIn para la pantalla de inicio de sesión
      },
      {
        path: "signup", // Ruta para registrarse
        element: <SignUp /> // Componente SignUp para la pantalla de registro
      }
    ]
  },
]);

const queryClient = new QueryClient(); // Creación del cliente de estado asíncrono

// Renderizado del componente raíz en el DOM con el enrutador y el proveedor de tema y estado
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}> {/* Aplicar el tema a toda la aplicación */}
        <RouterProvider router={router} /> {/* Proporciona el enrutador a la aplicación */}
      </ThemeProvider>
      <ReactQueryDevtools /> {/* Herramienta de depuración para React Query */}
    </QueryClientProvider>
  </StrictMode>
);
