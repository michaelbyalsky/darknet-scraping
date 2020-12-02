import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
})

export const getPastes = (entryPoint, payload) => {
    return api.get(entryPoint)
}

export const update = (entryPoint, payload) => {
    return api.patch(entryPoint, payload)
}




const apis = {
    getPastes,
    update
}


export default apis