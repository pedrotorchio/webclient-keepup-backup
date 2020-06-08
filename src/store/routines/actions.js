import { api } from '@/api';

export default {
  async fetchPatientRoutines({}, id) {
    let routines = await api.get(`patients/${id}/routines`);
    
    return routines;
  },
  async fetchRoutine({}, id) {
    let routines = await api.get(`routines/${id}`);
    
    return routines;
  },
  async createRoutine({}, { patientId, data }) {
    let routines = await api.post(`patients/${patientId}/routines`, data);
    
    return routines;
  },
  async updateRoutine({ state }, data) {
    const { id } = data;

    const response = await api.put(`routines/${id}`, data);
    
    return response;
  },
  async deleteRoutine({ state }, id) {
    
    await api.delete(`routines/${id}`);

    return true;
  }
}