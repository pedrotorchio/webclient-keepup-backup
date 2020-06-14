<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Route',
  data: () => ({
    rootActions: []
  }),
  methods: {
    ...mapMutations([
      'setActions'
    ]),
  },
  computed: {
    ...mapState({
      userData: state => state.auth.user
    }),
    pageTitle() {
      if (this.$route.meta && this.$route.meta.title) {
        const title = this.$route.meta.title;

        return title(this.$route, this);
      }

      return false;
    }
  },
  watch: {
    rootActions: {
      immediate: true,
      handler(array) { 
        this.setActions(array);
      }
    }
  }
}
</script>
