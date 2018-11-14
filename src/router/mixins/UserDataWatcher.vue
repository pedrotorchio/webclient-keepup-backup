<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      userData: state => state.auth.user
    })
  },
  methods: {
    onUserDataChange(data) {}
  },
  watch: {
    userData: {
      immediate: true,
      deep: true,
      handler(data) {
       this.onUserDataChange(data); 
      }
    }
  },
}
</script>
