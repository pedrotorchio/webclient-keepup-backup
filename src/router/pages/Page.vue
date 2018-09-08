<script>
import { mapState } from 'vuex';

export default {
  name: 'Page',
  computed: {
    ...mapState({
      userData: state => state.auth.user
    }),
    title() {
      if (this.$route.meta && this.$route.meta.title) {
        const title = this.$route.meta.title;

        return title(this.$route, this);
      }

      return false;
    }
  },
  created() {
    this.$store.dispatch('checkSession');
  }
}
</script>

