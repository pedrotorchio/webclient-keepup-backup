import { api } from "@/api";

export default {
  async fetchAllPatients({ state, getters }) {
  
    const id = getters.getUserId;
    
    const patients = await api.get(`users/${id}/patients`);
    
    state.patients.length = 0;
    patients.forEach(patient => state.patients.push(patient));

    return patients;
  },
  async createPatient({ getters }, data) {
  
    const id = getters.getUserId;
    
    const patient = await api.post(`users/${id}/patients`, data);
    
    state.patients.push(patient);

    return patient;
  }
}