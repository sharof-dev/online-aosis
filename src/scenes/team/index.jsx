import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import AuthService from "../../service/auth";
import { useEffect, useState } from "react";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([])

  const userGetAllPeople = async () => {
    try {
      const res = await AuthService.userGetAll()
      console.log(res); // Malumotlar to'g'ri olinib olinganini tekshirish
      const rowsWithId = res.sort((a,b) => a.userId - b.userId).map((row) => ({
        ...row,
        id: `${row.userId}`,
      }));
      setData(rowsWithId);
  
    } catch (error) {

    }
  }
  useEffect(() => {
    userGetAllPeople()
  }, [])
  const columns = [ 
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Firstname",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              params.row.authorities[0].authority === "ADMIN"
                ? colors.greenAccent[600]
                : params.row.authorities[0].authority === "USER"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {params.row.authorities[0].authority === "ADMIN" && <AdminPanelSettingsOutlinedIcon />}
            {params.row.authorities[0].authority === "USER" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {params.row.authorities[0].authority}
            </Typography>
          </Box>
        );
      },
    },
  ];
 

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
      {data.length > 0 ? (
        <DataGrid rows={data} columns={columns} rowHeight={75} />
      ) : (
        <p>No data available.</p>
      )}
      </Box>
    </Box>
  );
};

export default Team;
