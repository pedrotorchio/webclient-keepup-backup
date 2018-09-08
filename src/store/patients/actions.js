import { api } from "@/api";

export default {
  async fetchAllPatients({ state, getters }) {
    const id = getters.getUserId();

    const patients = await api.get(`users/${id}/patients`);

    state.patients.length = 0;
    patients.forEach(patient => state.patients.push(patient));

    return patients;
  },
  async createPatient({ getters, state }, data) {
    const id = getters.getUserId();

    const patient = await api.post(`users/${id}/patients`, data);

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
  async deletePatient({ state, getters }, id) {
    await api.delete(`patients/${id}`);

    const index = state.patients.findIndex(patient => patient.id == id);

    state.patients.splice(index, 1);

    return true;
  },
  async fetchArchivedPatients({ state, getters }) {
    const id = getters.getUserId();
    let patients = await api.get(`users/${id}/patients/archive`);

    return patients;
  }
};