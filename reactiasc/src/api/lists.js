import { httpClient } from "./httpClient"

export const getAllLists= async () => {
    const res = await httpClient.get('/lists')
    return res.data;
  }