import { api } from '@/api';

export default {
  async fetchRoutineTasks({  }, id) {
    let tasks = await api.get(`routines/${id}/tasks`);

    return tasks;
  }
}