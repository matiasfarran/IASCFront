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
export const checkTask= async (list, task) => {
    const res = await httpClient.post('/lists/'+list.name+'/tasks/'+ task.id + '/mark')
    return res.data;
}
export const unCheckTask= async (list, task) => {
    const res = await httpClient.delete('/lists/'+list.name+'/tasks/'+ task.id + '/mark')
    return res.data;
}
export const updateTask= async (list, task) => {
    const res = await httpClient.put('/lists/'+list.name+'/tasks/'+ task.id, {text : task.text})
    return res.data;
}
export const swapTask= async (fromList, toList, task) => {
    const res = await httpClient.put('/lists/'+fromList.name+'/swaps/tasks/', {task_id : task.id, end_list: toList})
    return res.data;
}