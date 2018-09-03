import { api } from '@/api';

export default {
  async signup({}, data) {
    return api.signup(data);
  }
}