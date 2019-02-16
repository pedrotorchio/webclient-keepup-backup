import { api } from "@/api";
import { mapState } from 'vuex';

let setMessageTimeout = null

export default {
    async setLoading({state}, value) {
        state.isLoading = value
    }, 
    setMessage({state, dispatch}, data) {
        
        let message = null,
            type = 'info',
            timeout = 3000,
            shown = Boolean(data)
        
    
        if(shown) {
            if (typeof data === 'string') {
                message = data
    
            } else if (data.message) {
                message = data.message
                type = data.type || state.message.type || type
                timeout = data.timeout || timeout
            }

            state.message.value = message
            state.message.type = type
            state.message.shown = true

        } else {
            state.message.shown = false

        }

        return new Promise(resolve=>{

            if (shown) {
                if (setMessageTimeout)
                    clearTimeout(setMessageTimeout)

                setMessageTimeout = setTimeout(()=>{
                    dispatch('setMessage');
                    resolve({ message, type, timeout });
                }, timeout);
            } else {
                if (setMessageTimeout)
                    clearTimeout(setMessageTimeout)
            }

        })
    }
};