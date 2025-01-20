import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { useEffect } from "react";

const Table = ({columns, rows, width}) => {
    const apiRef = useGridApiRef;

    useEffect(() => {
        // Trigger resize whenever rows or columns change
        if (apiRef.current) {
          apiRef.current.autoSizeColumns();
        }
      }, [rows, columns]);


    return (<DataGrid
                columns={columns}
                
                disableSelectionOnClick
                rows={rows}
                disableColumnResize={true}
                pageSizeOptions={[10, 20, 30]}
                initialState={{
                    pagination:{
                        paginationModel:{pageSize:10, page:0}
                    }
                }}
                sx={{
                    overflow:'scroll',
                    width: {width}
                }}
                    />)
}

export default Table;