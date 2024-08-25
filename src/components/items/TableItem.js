import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function TableItem({ itemsList }) {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
      flex: 0.3,
      headerClassName: "text-lg font-bold",
    },
    {
      field: "alias",
      headerName: "Code",
      width: 100,
      flex: 0.2,
      headerClassName: "text-lg font-bold text-center",
    },
    {
      field: "details",
      headerName: "Details",
      width: 150,
      flex: 0.1,
      headerClassName: "text-lg font-bold text-right",
      renderCell: (params) => (
        <Link
          href={`/items/${params.row.hospital_id}`}
          className="hover:text-blue-800 flex justify-end items-center"
        >
          <VisibilityIcon />
        </Link>
      ),
    },
  ];

  return (
    <div>
      <DataGrid
        rows={itemsList}
        autoHeight
        columns={columns}
        pageSizeOptions={[5, 10, 25, 50]}
        rowsPerPageOptions={[10]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        getRowId={(row) => row.hospital_id}
        disableSelectionOnClick
        sx={{
          "& .MuiDataGrid-root": {
            backgroundColor: "#fff",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "16px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiDataGrid-cell": {
            display: "grid",
            alignItems: "center",
          },
        }}
      />
    </div>
  );
}
