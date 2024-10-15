import axios from 'axios'
import { getItem } from '../helpers/storage'

axios.defaults.baseURL = 'http://213.230.64.93:8083'
axios.interceptors.request.use(config => {
    const token = getItem('access_token');
    const authorization = token ? `Bearer ${token}` : '';
    config.headers.Authorization = authorization;
    return config;
})
export default axios