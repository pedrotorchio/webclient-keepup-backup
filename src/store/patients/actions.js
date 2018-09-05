import { api } from "@/api";

export default {
  async fetchAllPatients({ state, getters }) {
    const id = getters.getUserId;
    const patients = await api.get(`users/${id}/patients`);

    return patients;
  }
}