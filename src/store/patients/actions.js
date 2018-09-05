import { api } from "@/api";

export default {
  async fetchAllPatients({ getters }) {
  
    const id = getters.getUserId;
    
    const patients = await api.get(`users/${id}/patients`);

    return patients;
  }
}