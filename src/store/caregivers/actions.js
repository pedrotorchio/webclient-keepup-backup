import { api } from "@/api";

export default {
  
  async createCaregivers({ getters, state }, data) {
    const id = getters.getUserId();

    const caregiver = await api.post(`patients/${id}/caregivers`, data);


    return caregiver;
  },
};