import axios from 'axios'

const api = axios.create({
    baseURL: '/api/v1',
})

export const getPastes = (entryPoint, payload) => {
    return api.get(entryPoint)
}

export const update = (entryPoint, payload) => {
    return api.patch(entryPoint, payload)
}

export const create = (entryPoint, payload) => {
    return api.post(entryPoint, payload)
}

export const remove = (entryPoint, payload) => {
    return api.delete(entryPoint, payload)
}





const apis = {
    getPastes,
    update,
    create,
    remove
}


export default apis