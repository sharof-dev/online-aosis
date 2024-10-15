import { Box, Button, useTheme, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Stack, FormControlLabel, Checkbox, IconButton } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from '@mui/icons-material/Close'
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import AuthService from "../../service/auth";
import { getItem } from "../../helpers/storage";
// import { toast } from "react-toastify";
import { newProducts } from "../../slice/auth";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Product = () => {
  const [data, setData] = useState()
  const [open, openChange] = useState(false)
  const [open1, openChange1] = useState(false)
  const [productName, setProductName] = useState('')
  const [productMark, setProductMark] = useState('')
  const [productGost, setProductGost] = useState('')
  const [productKg, setProductKg] = useState('')
  const [productRas, setProductRas] = useState('')
  const [price, setProductPrice] = useState('')
  const [updateState, setUpdateState] = useState(-1)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const getProduct = async () => {
    try {
      const res = await AuthService.productGetAll()
      console.log(res);
      setData(res)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProduct()
    console.log(+id);
  }, [])
  const handleDelete = async (id) => {
    console.log(id);
    try {
      await AuthService.productDelete(id)
      getProduct()
    } catch (error) {

    }
  }

  const functionOpen = () => {
    openChange(true)
  }
  const functionClose = () => {
    openChange(false)
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
      console.log(la.name);
      setProductName(la.name)
      setProductMark(la.mark);
      setProductGost(la.gost);
      setProductKg(la.kg);
      setProductPrice(la.price);
      setProductRas(la.normRasxodMat);
      setUpdateState(id);


    } catch (error) {

    }
  }

  // const validate = () => {
  //   let res = true
  //   if (productName === '' || productName === null) {
  //     res = false
  //     toast.warning('Please Enter Product Name')
  //   }
  //   if (productMark === '' || productMark === null) {
  //     res = false
  //     toast.warning('Please Enter Mini Firm Price')
  //   }


  //   return res
  // }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const firmaId = +getItem('comp_id')
    console.log(firmaId);
    try {
      const payload = {
        name: productName,
        mark: productMark,
        gost: productGost,
        kg: productKg,
        normRasxodMat: +productRas,
        price,
        firmaId
      }
      if (updateState === -1) {
        const res = await AuthService.newProduct({ payload })
        console.log(res);
        dispatch(newProducts(res));
        navigate('/');
        functionClose1()
      }
      else {
        const res = await AuthService.editProducts(updateState, payload);
        console.log(res);
        getProduct();
        functionClose1()
      }

      // }
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <Box m="20px ">
      <Header title="Product" subtitle="Frequently Asked Questions Page" />
      <div style={{ textAlign: 'center' }}>
        <Button color='success' variant="outlined" size='large' onClick={functionOpen}>Add Product</Button>

      </div>
      {data && data.sort((a,b) => a.productId - b.productId).map((item) => (
        <Accordion defaultExpanded key={item.productId}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              {item.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box>
              <Typography>
                Mark: {item.mark}
              </Typography>
              <Typography>
                Gost: {item.gost}
              </Typography>
              <Typography>
                Price: {item.price}
              </Typography>
              <Typography>
                Sum: {item.sum}
              </Typography>
              <Typography>
                Average Cost: {item.normRasxodMat}
              </Typography>
            </Box>
            <Button variant="contained" color="error" onClick={() => handleDelete(item.productId)} >Delete</Button>
            <Button variant="contained" color="success" onClick={() => handleEdit(item.productId, item)} >Edit</Button>
          </AccordionDetails>
        </Accordion>
      ))}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>


        <Dialog fullScreen open={open} onClose={functionClose} fullWidth maxWidth='sm'>
          <DialogTitle>
            New Product <IconButton onClick={functionClose} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField variant="outlined" label='Product name' onChange={e => setProductName(e.target.value)} ></TextField>
              <TextField variant="outlined" label='Product Mark' onChange={e => setProductMark(e.target.value)}></TextField>
              <TextField variant="outlined" label='Product Gost' onChange={e => setProductGost(e.target.value)}></TextField>
              <TextField variant="outlined" label='Product kg' onChange={e => setProductKg(e.target.value)}></TextField>
              <TextField variant="outlined" type="number" label='Product price' onChange={e => setProductPrice(e.target.value)}></TextField>
              <TextField variant="outlined" label='Material consumption rate' inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*"
              }} onChange={e => setProductRas(e.target.value)}></TextField>
              <Button color="success" variant="outlined" onClick={handleSubmit}>Save</Button>
            </Stack>
          </DialogContent>
        </Dialog>

      </div>

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>


        <Dialog fullScreen open={open1} onClose={functionClose1} fullWidth maxWidth='sm'>
          <DialogTitle>
            Update <IconButton onClick={functionClose1} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField variant="outlined" label='Mahsulot nomi' onChange={e => setProductName(e.target.value)} value={productName}></TextField>
              <TextField variant="outlined" label='Mahsulot belgisi' onChange={e => setProductMark(e.target.value)} value={productMark}></TextField>
              <TextField variant="outlined" label='Mahsulot Gost' onChange={e => setProductGost(e.target.value)} value={productGost}></TextField>
              <TextField variant="outlined" label='Mahsulot kg' onChange={e => setProductKg(e.target.value)} value={productKg}></TextField>
              <TextField variant="outlined" type="number" label='Mahsulot narxi' onChange={e => setProductPrice(e.target.value)} value={price}></TextField>
              <TextField variant="outlined" label='Material iste`mol darajasi' inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }} onChange={e => setProductRas(e.target.value)} value={productRas}></TextField>

              <Button color="success" variant="outlined" onClick={handleSubmit}>Update</Button>
            </Stack>
          </DialogContent>
        </Dialog>

      </div>
    </Box>
  );
};

export default Product;
