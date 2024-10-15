import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import AuthService from "../../service/auth";
import { useDispatch } from "react-redux";
import { newMiniFirm } from "../../slice/auth";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import { getItem } from "../../helpers/storage";


const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, openChange] = useState(false);
  const [open1, openChange1] = useState(false);
  const [miniFirmName, setMiniFirmName] = useState('');
  const [miniFirmPrice, setMiniFirmPrice] = useState('');
  const [data, setData] = useState([])
  const [updateState, setUpdateState] = useState(-1)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getMiniFirmAll = async () => {
    try {
      const res = await AuthService.miniFirmGetAll()
      const rowsWithId = res.map((row) => ({
        ...row,
        id: `${row.miniFermaId}`,

      }));
      setData(rowsWithId)
      console.log(rowsWithId);

    } catch (error) {

    }
  }
  
  const functionOpen1 = () => {
    openChange1(true)
  }
  const functionClose1 = () => {
    openChange1(false)
  }
  const handleEdit = (id, la) => {
    try {
      functionOpen1()
      setMiniFirmName(la.name)
      setMiniFirmPrice(la.price)
      setUpdateState(id)

    } catch (error) {

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const firmaId = +getItem('comp_id')
    const payload = {
      name: miniFirmName,
      price: miniFirmPrice,
      firmaId
    }
    try {
      if (updateState === -1) {
        const res = await AuthService.newMiniFirm( payload )
        console.log(res);
        dispatch(newMiniFirm(res));
        navigate('/product');
        functionClose1()
      }
      else {
        const res = await AuthService.editMiniFirm(updateState, payload);
        console.log(res);
        getMiniFirmAll();
        functionClose1()
      }
    } catch (error) {
      console.error(error);
    }
  }



  const handleDelete = async (id) => {
    try {
      await AuthService.miniFirmaDelete(id)
      getMiniFirmAll()
    } catch (error) {

    }
  }

  useEffect(() => {
    getMiniFirmAll()
  }, [])

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 2,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <Button color="error" variant="contained" onClick={() => handleDelete(params.row.miniFermaId)} >Delete</Button>
          <Button color="success" variant="contained" onClick={() => handleEdit(params.row.miniFermaId, params.row)} >Edit</Button>
        </>
      ),
    },
  ];

  const functionOpen = () => {
    openChange(true)
  }
  const functionClose = () => {
    openChange(false)
  }
  return (
    <Box m="20px">
      <Header title="Mini Firm" subtitle="List of Mini Form" />
      <div style={{ textAlign: 'center' }}>
        <Button color='success' style={{ textAlign: 'center' }} variant="outlined" size='large' onClick={functionOpen}>Add Mini Firm
          &nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
          </svg>
        </Button>
      </div>
      <Box
        m="40px 0 0 0"
        height="65vh"
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
          <DataGrid rows={data} columns={columns} />
        ) : (
          <p>No data available.</p>
        )}
      </Box>

      <Dialog fullScreen open={open} onClose={functionClose} fullWidth maxWidth='sn
      m'>
        <DialogTitle>
          New Mini Firm<IconButton onClick={functionClose} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              variant="outlined"
              label='Mini Firm name'
              onChange={e => setMiniFirmName(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              label='Price'
              onChange={e => setMiniFirmPrice(e.target.value)}
            ></TextField>
            <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label='Agree terms & condition' ></FormControlLabel>
            <Button
              color="success"
              variant="outlined"
              onClick={handleSubmit}
            >Save</Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog fullScreen open={open1} onClose={functionClose1} fullWidth maxWidth='sn
      m'>
        <DialogTitle>
          New Mini Firm<IconButton onClick={functionClose1} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              variant="outlined"
              label='Mini Firm name'
              value={miniFirmName}
              onChange={e => setMiniFirmName(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              label='Price'
              value={miniFirmPrice}
              onChange={e => setMiniFirmPrice(e.target.value)}
            ></TextField>
            <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label='Agree terms & condition' ></FormControlLabel>
            <Button
              color="success"
              variant="outlined"
              onClick={handleSubmit}
            >Save</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>

  );
};

export default Invoices;
