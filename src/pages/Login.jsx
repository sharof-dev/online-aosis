import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useDispatch, useSelector } from 'react-redux'
import { signUserFailure, signUserStart, signUserSuccess } from '../slice/auth'
import AuthService from '../service/auth'
import { useNavigate } from 'react-router-dom'
// import { toast, ToastContainer } from 'react-toastify';


const Login = () => {
  const { loggedIn } = useSelector(state => state.auth)
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = createTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  // const validate = () => {
  //   let res = true
  //   if (username === '' || username === null) {
  //     res = false
  //     toast.warning('Please Enter Usename')
  //   }
  //   if (password === '' || password === null) {
  //     res = false
  //     toast.warning('Please Enter Password')
  //   }

  //   return res
  // }
  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(signUserStart())
    console.log(username,password)
    // if (validate()) {
      try {
        const response = await AuthService.userLogin({ username, password })
        console.log(response);
        dispatch(signUserSuccess(response))
        navigate('/')
      } catch (error) {
        // dispatch(signUserFailure(error.response.data.errors))
      }
    // }

  };


  return (
    <ThemeProvider theme={theme} sx={{ backgroundColor: '#141b2d' }}>
      <Box sx={{
        backgroundColor: '#141b2d', width: '100%',
        height: '100%'
      }}>
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

              <TextField
                margin="normal"
                required
                fullWidth
                id="text"
                label="Username"
                name="text"
                autoComplete="text"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                disabled={loggedIn}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

            </Box>
          </Box>

        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Login