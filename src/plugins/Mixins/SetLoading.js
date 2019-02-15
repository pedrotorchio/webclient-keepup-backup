import { mapActions, mapState } from 'vuex'

export default {
    computed: {
        ...mapState({
            gIsLoading: state => state.system.isLoading
        })
    },
    methods: {
        ...mapActions({
            setGlobalLoading: 'setLoading'
        })
    }
}