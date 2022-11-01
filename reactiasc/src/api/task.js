import { httpClient } from "./httpClient"

export const getAllTasksOf= async (list) => {
    const res = await httpClient.get('/lists/'+list+'/tasks')
    res.data.forEach((task) => {task.list = list});
    return res.data;
}

export const createTask= async (list, task) => {
    const res = await httpClient.post('/lists/'+list.name+'/tasks', task)
    return res.data;
}

export const deleteTask= async (list, task) => {
    const res = await httpClient.delete('/lists/'+list.name+'/tasks/'+ task.id)
    return res.data;
}
