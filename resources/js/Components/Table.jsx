import { DataGrid, useGridApiRef } from "@mui/x-data-grid";

export default Table = ({columns, rows}) => {
    const apiRef = useGridApiRef;

    useEffect(() => {
        // Trigger resize whenever rows or columns change
        if (apiRef.current) {
          apiRef.current.autoSizeColumns();
        }
      }, [rows, columns]);


    return <div style={{height:'80vh', width:'80vw', overflow:'scroll'}}>
                <DataGrid
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
                            overflowX:'scroll',
                            width:'1200px'
                        }}
                    />
            </div>
}