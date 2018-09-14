import { api } from "@/api";

export default {
  async fetchAllPatients({ state }) {

    const patients = await api.get(`patients`);

    state.patients.length = 0;
    patients.forEach(patient => state.patients.push(patient));

    return patients;
  },
  async createPatient({ getters, state }, data) {
    const id = getters.getUserId();

    const patient = await api.post(`patients`, data);

    state.patients.push(patient);

    return patient;
  },
  async updatePatient({ state }, data) {
    const { id } = data;

    const response = await api.put(`patients/${id}`, data);
    const index = state.patients.findIndex(patient => patient.id == data.id);

    state.patients[index] = { ...response };

    return response;
  },
  async restorePatient({ state }, id) {
    const patient = await api.delete(`patients/${id}`);
    
    state.patients.push(patient);

    return true;
  },
  async deletePatient({ state }, id) {
    
    await api.delete(`patients/${id}`);

    const index = state.patients.findIndex(patient => patient.id == id);

    state.patients.splice(index, 1);

    return true;
  },
  async fetchArchivedPatients({ getters }) {
    
    let patients = await api.get(`patients/archive`);

    return patients;
  }
};