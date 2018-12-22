import { api } from '@/api';
import publicActions from './public-actions';

export default { ...publicActions,

  async fetchRoutineTasksForms({}, id) {
    const forms = await api.get(`routines/${id}/tasks-forms`);
    
    return forms;
  },
  async fetchTasksForm({}, id) {
    const form = await api.get(`tasks-forms/${id}`);

    form.tasks = form.sorted_tasks;
    
    return form;
  },
  async createTasksForm({}, { routineId, data }) {
    const form = await api.post(`routines/${routineId}/tasks-forms`, data);
    
    return form;
  },
  async updateTasksForm({ state }, data) {
    const { id } = data;

    const response = await api.put(`tasks-forms/${id}`, data);
    
    return response;
  },
  async deleteTasksForm({ state }, id) {
    
    await api.delete(`tasks-forms/${id}`);

    return true;
  },
  async formCreateTask({}, {formUid, data}) {
    const tasks = await api.post(`task-filling/${formUid}`, data);

    return tasks;
  },
  async formUpdateTask({}, {formUid, taskUid, data}) {
    const tasks = await api.put(`task-filling/${formUid}/${taskUid}`, data);

    return tasks;
  },
  async formDeleteTask({}, {formUid, taskUid}) {
    const tasks = await api.delete(`task-filling/${formUid}/${taskUid}`);

    return tasks;
  } 
}