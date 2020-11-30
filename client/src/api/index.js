import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
})

export const getPastes = (entryPoint, payload) => {
    console.log(payload);
    return api.get(entryPoint)
}

const apis = {
    getPastes,
}

export default apis