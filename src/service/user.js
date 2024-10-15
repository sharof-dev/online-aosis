import axios from './api'

const GetAll = {
    async logGet () {
        const {data} = await axios.get('/file/log')
        return data
    }
}

export default GetAll