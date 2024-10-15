import { getItem } from "../helpers/storage";
import axios from "./api"
const username = getItem('username')

const AuthService = {
    async userRegister(user) {
        const response = await axios.post('/user/add-user', user)
        return response.data
    },
    async userLogin(user) {
        const response = await axios.post('/user/sign-in', user)
        return response.data
    },
    async getUser(id) {
        const response = await axios.get(`/user/get-with-all/${id}`)
        return response.data
    },
    async getUserAll() {

        const { data } = await axios.get('/user/get-all')
        return data
    },
    async newCompany(data) {
        const response = await axios.post(`/firma/create`, data)
        return response.data
    },
    async newMiniFirm(data) {
        const response = await axios.post(`/miniFirma/create`, data)
        return response.data
    },
    async newProduct(data) {
        console.log(data);
        const response = await axios.post(`/product/create`, data)
        return response.data
    },
    async updateUser(id, user) {
        const response = await axios.put(`/user/create/${id}`, user)
        return response.data
    },
    async productGetAll() {
        const { data } = await axios.get('/product/get-all')
        return data.data
    },
    async productDelete(id) {
        const {data} = await axios.delete(`/product/delete/${id}`)
    },
    async miniFirmGetAll() {
        const {data} = await axios.get('/miniFirma/get-all')
        return data.data
    },
    async miniFirmaDelete(id) {
        const {data} = await axios.delete(`/miniFirma/delete/${id}`)
    },
    async companyGetAll() {
        const {data} = await axios.get('/firma/get-all')
        return data.data
    },
    async firmaDelete(id) {
        const {data} = await axios.delete(`/firma/delete/${id}`)
    },
    async editProducts(id, payload) {
        const {data} = await axios.put(`/product/update/${id}`,payload)
        return data
    },
    async editMiniFirm(id, payload) {
        const {data} = await axios.put(`/miniFirma/update/${id} `,payload)
        return data
    },
    async editCompany(id, payload) {
        const {data} = await axios.put(`/firma/update/${id}`,payload)
        return data
    },
    async userGetAll() {
        const {data} = await axios.get(`/user/get-all`)
        return data.data
    },
    async imgCreate(id, payload) {
        const {data} = await axios.post(`/image/create?userId=${id}`, payload )
        return data.data
    },
    async imgGet(id) {
        const {data} = await axios.post(`/image/get/${id}`)
        return data.data
    },
}

export default AuthService