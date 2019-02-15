import { mapActions, mapState } from 'vuex'

export default {
    data: {
        localIsLoading___: false
    },
    computed: {
        ...mapState({
            gIsLoading: state => state.system.isLoading
        }),
        isLoading: {
            get() {
                return this.gIsLoading || this.localIsLoading
            },
            set(value) {
                this.localIsLoading___ = value
            }            
        }
    },
    methods: {
        ...mapActions({
            setGlobalLoading: 'setLoading'
        })
    }
}