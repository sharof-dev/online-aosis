import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Stack, TextField } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CloseIcon from '@mui/icons-material/Close'
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { newComp, signUserFailure, } from "../../slice/auth";
import AuthService from "../../service/auth";
// import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [open, openChange] = useState(false);
  const [open1, openChange1] = useState(false);
  const [compName, setCompName] = useState('');
  const [cherNum, setCherNum] = useState('');
  const [recipient, setRecipient] = useState('');
  const [customer, setCustomer] = useState('');
  const [productCheck, setProductCheck] = useState(false)
  const [miniFirmCheck, setMiniFirmCheck] = useState(false)
  
  const [updateState, setUpdateState] = useState(-1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const validate = () => {
  //   let res = true
  //   if (compName === '' || compName === null) {
  //     res = false
  //     toast.warning('Please Enter Company Name')
  //   }
  //   if (cherNum === '' || cherNum === null) {
  //     res = false
  //     toast.warning('Please Enter Cher Num')
  //   }
  //   if (recipient === '' || recipient === null) {
  //     res = false
  //     toast.warning('Please Enter Recipient')
  //   }
  //   if (cherNum === '' || cherNum === null) {
  //     res = false
  //     toast.warning('Please Enter Cher Num')
  //   }
  //   if (customer === '' || customer === null) {
  //     res = false
  //     toast.warning('Please Enter Customer')
  //   }

  //   return res
  // }
  const functionOpen1 = () => {
    openChange1(true)
  }
  const functionClose1 = () => {
    openChange1(false)
  }
  const handleEdit = (id, la) => {
    try {
      functionOpen1()
      setCherNum(la.cherNomer);
      setCompName(la.name);
      setCustomer(la.mijoz);
      setRecipient(la.peopleName)
      setUpdateState(id)
    } catch (error) {

    }
  }
  const handleSubmit = async () => {
    const data = {
      cherNomer: cherNum,
      mijoz: recipient,
      name: compName,
      peopleName: customer,
    };
    try {
      if (productCheck) {
        navigate('/mini-firm')
      }
      if (updateState === -1) {
        const res = await AuthService.newCompany( data )
        console.log(res);
        dispatch(newComp(res));
        functionClose1()
      }
      else {
        const res = await AuthService.editCompany(updateState, data);
        console.log(res);
        companyGetAllData();
        functionClose1()
      }
      
    } catch (error) {
      dispatch(signUserFailure(error))
    }




    setCherNum('');
    setCompName('');
    setCustomer('');
    setData('');
    setRecipient('')

  };

  const companyGetAllData = async () => {
    try {
      const res = await AuthService.companyGetAll()
      const rowsWithId = res.map((row) => ({
        ...row,
        id: `${row.firmaId}`,

      }));
      setData(rowsWithId)
      console.log(rowsWithId);

    } catch (error) {

    }
  }
  useEffect(() => {
    companyGetAllData()
  }, [])
  const handleDelete = async (id) => {
    try {
      await AuthService.firmaDelete(id)
      companyGetAllData()
    } catch (error) {

    }
  }

  const functionOpen = () => {
    openChange(true)
  }
  const functionClose = () => {
    openChange(false)
  }
  const handleProduct = (id) => {
    navigate(`/product`)
    console.log(id);
  }
  const handleMiniFirm = (id) => {
    navigate(`/mini-firm`)
    console.log(id);
  }
  const columns = [
    { field: "id", headerName: "ID", },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    { field: "mijoz", headerName: "Customer", flex: 1, },
    {
      field: "peopleName",
      headerName: "Recipient",
      flex: 1,
    },
    {
      field: "cherNomer",
      headerName: "Draft",
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <Button onClick={() => handleProduct(params.row.firmaId)} color="success" variant="outlined" >Product</Button>
            <Button onClick={() => handleMiniFirm(params.row.firmaId)} color="success" variant="outlined" >Mini Firm</Button>
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <Button onClick={() => handleDelete(params.row.firmaId)} color="error" variant="outlined" >Delete</Button>
            <Button onClick={() => handleEdit(params.row.firmaId, params.row)} color="success" variant="outlined" >Edit</Button>
          </div>
        </div >
      ),
    },
  ];

// const Body = document.querySelectorAll('body')

// const date = new Date()
// const handleClick = (event) => {
//   console.log(event.target.textContent, date.getTime())
// }

// Body.forEach(b => {
//   b.addEventListener('click', handleClick)
// })

return (
  <Box m="20px">
    <Header
      title="Company"
    />
    <div style={{ textAlign: 'center' }}>
      <Button color='success' variant="outlined" size='large' onClick={functionOpen}>Add Company
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
        </svg>
      </Button>
    </div>
    <Box
      m="40px 0 0 0"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          fontSize: "14px",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
          fontSize: "14px",
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
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}
    >
      {data.length > 0 ? (
        <DataGrid rows={data} columns={columns} rowHeight={75} />
      ) : (
        <p>No data available.</p>
      )}
      <Dialog fullScreen open={open} onClose={functionClose} fullWidth maxWidth='sm'>
        <DialogTitle>
          New Company <IconButton onClick={functionClose} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              variant="outlined"
              label='Company name'
              onChange={(e) => setCompName(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              label='Cher Number'
              onChange={(e) => setCherNum(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              label='Recipient'
              onChange={(e) => setRecipient(e.target.value)}
            ></TextField>
            <TextField
              variant="outlined"
              label='Customer'
              onChange={(e) => setCustomer(e.target.value)}
            ></TextField>

            <Box style={{ display: 'flex', gap: '.5rem' }}>
              <FormControlLabel
                required
                control={<Checkbox />}
                label="Product"
                onChange={() => setProductCheck(!productCheck)}
              />
              <FormControlLabel
                required
                control={<Checkbox />}
                color="success"
                label="Mini Firm"
                onChange={() => setMiniFirmCheck(!miniFirmCheck)}
              />

            </Box>

            <Button color='success' variant="contained" onClick={handleSubmit}>Save</Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Dialog fullScreen open={open1} onClose={functionClose1} fullWidth maxWidth='sm'>
        <DialogTitle>
          Update Company <IconButton onClick={functionClose1} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField
              variant="outlined"
              label='Company name'
              onChange={(e) => setCompName(e.target.value)}
              value={compName}
            ></TextField>
            <TextField
              variant="outlined"
              label='Cher Number'
              onChange={(e) => setCherNum(e.target.value)}
              value={cherNum}
            ></TextField>
            <TextField
              variant="outlined"
              label='Recipient'
              onChange={(e) => setRecipient(e.target.value)}
              value={recipient}
            ></TextField>
            <TextField
              variant="outlined"
              label='Customer'
              onChange={(e) => setCustomer(e.target.value)}
              value={customer}
            ></TextField>


            <Button color='success' variant="contained" onClick={handleSubmit}>Save</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>

  </Box>
);
};

export default Contacts;
