import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions({
            setGlobalMessage: 'setMessage'
        })
    }
}