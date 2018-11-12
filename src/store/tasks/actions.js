import { api } from '@/api';

export default {
  async fetchRoutineTasks({  }, id) {
    let tasks = await api.get(`routines/${id}/tasks`);

    return tasks;
  },
  async updateTask({}, data) {
    const { id } = data;

    const response = await api.put(`task/${id}`, data);
    
    return response;
  },
}