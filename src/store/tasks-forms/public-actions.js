import { api } from '@/api';

export default {
  async fetchTasksFormPublicData( {}, uid ) {
    const form = await api.get(`task-filling/${uid}`);

    form.tasks = form.sorted_tasks;

    return form;
  },
  async fetchTaskOptions() {
    const tasks = await api.get('task-filling/task-options');

    return tasks;
  }
}