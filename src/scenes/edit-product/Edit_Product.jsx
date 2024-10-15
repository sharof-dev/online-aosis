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

const Edit_Product = () => {
  const [data, setData] = useState()
  const [open, openChange] = useState(true)
  const [productName, setProductName] = useState('')
  const [productMark, setProductMark] = useState('')
  const [productGost, setProductGost] = useState('')
  const [productKg, setProductKg] = useState('')
  const [productRas, setProductRas] = useState('')
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
  useEffect(() => {
    // Set input values with fetched data
    
    
  if (data && data.length > 0) {
      const firstProduct = data[0]; // You may need to choose the appropriate product
      setProductName(firstProduct.name);
      setProductMark(firstProduct.mark);
      setProductGost(firstProduct.gost);
      setProductKg(firstProduct.kg);
      setProductRas(firstProduct.normRasxodMat);
    }
  }, [data]);
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
      // if (validate()) {
      const res = await AuthService.newProduct({
        name: productName,
        mark: productMark,
        gost: productGost,
        kg: productKg,
        normRasxodMat: +productRas,
        firmaId: 1,
        sum: 6666,
        price: 0.32

      })
      console.log(res);
      dispatch(newProducts(res));
      navigate('/');
      // }
    } catch (error) {
      console.error(error);
    }
  }

  const functionOpen = () => {
    openChange(true)
  }
  const functionClose = () => {
    openChange(false)
  }

  return (
    <Box m="20px ">
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>


        <Dialog fullScreen open={open} onClose={functionClose} fullWidth maxWidth='sm'>
          <DialogTitle>
            New Product <IconButton onClick={functionClose} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField variant="outlined" label='Product name' onChange={e => setProductName(e.target.value)}></TextField>
              <TextField variant="outlined" label='Product Mark' onChange={e => setProductMark(e.target.value)}></TextField>
              <TextField variant="outlined" label='Product Gost' onChange={e => setProductGost(e.target.value)}></TextField>
              <TextField variant="outlined" label='Product kg' onChange={e => setProductKg(e.target.value)}></TextField>
              <TextField variant="outlined" label='Material consumption rate' inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*"
              }} onChange={e => setProductRas(e.target.value)}></TextField>
              <Button color="success" variant="outlined" onClick={handleSubmit}>Save</Button>
            </Stack>
          </DialogContent>
        </Dialog>

      </div>
    </Box>
  );
};

export default Edit_Product;
