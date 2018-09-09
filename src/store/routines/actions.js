import { api } from '@/api';

export default {
  async fetchPatientRoutines({}, id) {
    let routines = await api.get(`patients/${id}/routines`);
    
    return routines;
  }
}