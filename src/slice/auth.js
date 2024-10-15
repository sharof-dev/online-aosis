import { createSlice } from '@reduxjs/toolkit'
import { setItems } from '../helpers/storage'

const initialState = {
    isLoading: false,
    loggedIn: false,
    error: null,
    user: null,
    comp: null,
    product: null,
    user_update: null,
    imageUs: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUserStart: state => {
            state.isLoading = true
        },
        signUserSuccess: (state, action) => {
            state.loggedIn = true
            state.isLoading = false
            state.user = action?.payload;
            setItems('user_id', action.payload.data.id);
            setItems('access_token', action.payload.data.accessToken);
            setItems('refresh_token', action.payload.data.refreshToken);

        },
        signUserFailure: (state, action) => {
            state.isLoading = false;
            state.error = action?.payload
        },
        logOut: (state) => {
            state.loggedIn = false;
            state.user = null;
        },
        getUsers: (state, action) => {
            state.loggedIn = true;
            state.isLoading = false
            state.user = action?.payload            
            setItems('username', action.payload.data.username);
        },
        newComp: (state, action) => {
            state.isLoading = false;
            state.loggedIn = true;
            state.comp = action?.payload    
            setItems('comp_id', action?.payload?.data?.firmaId)
        },
        newProducts: (state, action) => {
            state.isLoading = false;
            state.loggedIn = true;
            state.product = action?.payload
        },
        newMiniFirm: (state, action) => {
            state.isLoading = false;
            state.loggedIn = true;
            state.product = action?.payload
        },
        newUserAddAdmin: (state, action) => {
            state.isLoading = false;
            state.loggedIn = true;
            state.product = action?.payload
        },
        userUpdate: (state, action) => {
            state.isLoading = false;
            state.loggedIn = true;
            state.user_update = action?.payload
        },
        productGetSuccesful: (state, action) => {
            state.isLoading = false;
            state.loggedIn = true;
            state.product = action?.payload
        },
        imageData : (state, action) => {
            state.isLoading = false;
            state.loggedIn = true;
            state.imageUs = action?.payload
        }
    }
})

export const {
    signUserStart,
    signUserSuccess,
    signUserFailure,
    getUsers,
    newComp,
    newProducts,
    newMiniFirm,
    newUserAddAdmin,
    logOut,
    userUpdate,
    productGetSuccesful,
    imageData
    } = authSlice.actions;
export default authSlice.reducer