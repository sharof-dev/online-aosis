import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Stack, InputAdornment } from "@mui/material";
import { Formik } from "formik";

import CloseIcon from '@mui/icons-material/Close'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import AuthService from "../../service/auth";
import { imageData, newUserAddAdmin, userUpdate } from "../../slice/auth";
import { getItem } from "../../helpers/storage";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [userCheck, setUserCheck] = useState(false)
  const [pwdShow, setPwdShow] = useState(false)
  const [open, openChange] = useState(false)
  const [image, setImage] = useState(null);
  const [imgData, setImgData] = useState()
  const navigate = useNavigate()
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);
      setImgData(formData)

    }
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
    const id = getItem('user_id')
    try {
      const res = await AuthService.updateUser(+id, values)
      const imageus = await AuthService.imgCreate(+id, imgData)
      dispatch(userUpdate(res.data))
      dispatch(imageData(imageus.data))
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  }
  const handlerSubmit = async () => {
    try {
      const response = await AuthService.userRegister({ username, password })
      dispatch(newUserAddAdmin(response.data))
      navigate('/')
    } catch (error) {

    }
  }
  const functionOpen = () => {
    openChange(true)
  }
  const functionClose = () => {
    openChange(false)
  }
  const handleToggle = () => {
    setPwdShow(!pwdShow)
  }
  const getUser = async () => {
    try {
      const data = await AuthService.getUser(+id)
      if (data.data.authorities[0].authority === 'ADMIN') {
        setUserCheck(true)
      }
    } catch (error) {
    }
  }
  useEffect(() => {
    getUser()
  }, [])

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type={pwdShow ? 'text' : 'password'}
                label="New password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggle} edge="end">
                        {pwdShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} >
                Upload file
                <VisuallyHiddenInput type="file" onChange={handleImageChange} />
              </Button>
            </Box>
            {image && (
              <Box sx={{ borderRadius: '50%' }}>
                <img src={image} alt="img" width={100} height={100}  style={{ borderRadius: "50%", marginTop: '1rem' }} />
              </Box>
            )}
            <Box display="flex" justifyContent="end" mt="20px" mb="1rem">
              <Button type="submit" color="secondary" variant="contained">
                Save
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {userCheck && (
        <div style={{ textAlign: 'right' }}>
          <Button color='secondary' variant="contained" onClick={functionOpen}>Create New User</Button>

        </div>
      )}


      <div style={{ textAlign: 'center' }}>


        <Dialog fullScreen open={open} onClose={functionClose} fullWidth maxWidth='sm'>
          <DialogTitle>
            New User <IconButton onClick={functionClose} style={{ float: 'right' }}><CloseIcon color="primary"></CloseIcon></IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} margin={2}>
              <TextField variant="outlined" label='Username' onChange={e => setUsername(e.target.value)}></TextField>
              <TextField variant="outlined" label='Password' onChange={e => setPassword(e.target.value)}></TextField>
              <Button color="success" variant="outlined" onClick={handlerSubmit}>Save</Button>
            </Stack>
          </DialogContent>
        </Dialog>

      </div>
    </Box>
  );
};

const id = getItem('user_id')

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  username: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: '',
  username: "",
  passsportSeries: 'null',
};

export default Form;
