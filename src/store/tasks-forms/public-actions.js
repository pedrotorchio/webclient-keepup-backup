import { api } from '@/api';

export default {
  async fetchTasksFormPublicData( {}, uid ) {
    const form = await api.get(`task-filling/${uid}`);

    return form;
  }
}