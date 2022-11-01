import { httpClient } from "./httpClient"

export const getAllTasksOf= async (list) => {
    const res = await httpClient.get('/lists/'+list+'/tasks')
    res.data.forEach((task) => {task.list = list});
    return res.data;
}