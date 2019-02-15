import { api } from "@/api";

export default {
    async setLoading({state}, value) {
        state.isLoading = value
    }   
};