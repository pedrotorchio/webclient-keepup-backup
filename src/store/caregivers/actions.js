import { api } from "@/api";

export default {
  
  async createCaregiver({ getters, rootState }, data) {
    
    const { id } = data;
    const caregiver = await api.post(`patients/${id}/caregivers`, data);

    return caregiver;
  },
  async deleteCaregiver({}, id) {
    await api.delete(`caregivers/${id}`);

    return true;
  }
};