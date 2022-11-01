import { httpClient } from "./httpClient"

export const getAllLists= async () => {
    const res = await httpClient.get('/lists')
    return res.data;
}

export const createList = async (list) => {
    const res = await httpClient.post('/lists/',{name:list.name})
    return res.data;
}