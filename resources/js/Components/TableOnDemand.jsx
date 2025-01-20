import React, { useState, useEffect, useMemo } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { ApiEndpoint } from '@/Config/APISettings';

/**
 * Tabla creada para refrescar datos por medio de una API.
 * La API debe soportar los parametros page y pageSize, ambos numéricos.
 * 
 * @param columns "Las columnas que tiene la tabla en el formato establecido por MUI x-data-grid"
 * @returns "Una tabla de tipo x-data-grid"
 */
const TableOnDemand = ({columns, api}) => {
  const apiRef = useGridApiRef();
  const [rows, setRows] = useState([]); // Datos de las observaciones
  const [rowCount, setRowCount] = useState(0); // Total de registros
  const [isLoading, setIsLoading] = useState(false);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, // Página actual (0 indexada)
    pageSize: 10, // Número de registros por página
  });

  // Fetch de datos desde el servidor
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          api.getApiUrl(paginationModel.page + 1, paginationModel.pageSize, true)
        );
        const { data, total } = await response.json(); // Laravel devuelve los datos paginados y el total

        const rows = data.map((observacion) => ({
                id: observacion.id_observacion,
                ...observacion,
            }));

        console.log(rows);

        setRows(rows); // Configurar las filas con los datos de la respuesta
        setRowCount(total); // Total de registros para configurar la paginación
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [paginationModel]);

  return (
    <div style={{ height: '80vh', width: '90vw'}}>
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        pagination
        paginationMode="server"
        disableColumnResize
        rowCount={rowCount}
        pageSizeOptions={[10, 20, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        loading={isLoading}
        sx={{
          overflow:'scroll',
          width:{
            xs:'1300px'
          }
        }}
      />
    </div>
  );
};

export default TableOnDemand;
