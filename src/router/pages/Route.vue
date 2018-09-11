<script>
import { mapState } from 'vuex';

export default {
  name: 'Route',
  props: {
    actions: {
      type: Array,
      default: []
    }
  },
  data: () => ({
    rootActions: [],
    viewActions: []
  }),
  methods: {
    updateActions() {
      this.$emit('update:actions', this.allActions);
    }
  },
  computed: {
    ...mapState({
      userData: state => state.auth.user
    }),
    allActions() {
      return [ ...this.rootActions, ...this.viewActions ];
    },
    title() {
      if (this.$route.meta && this.$route.meta.title) {
        const title = this.$route.meta.title;

        return title(this.$route, this);
      }

      return false;
    }
  },
  watch: {
    viewActions: {
      immediate: true,
      handler(array) {
        this.updateActions();
      
      }
    },
    rootActions: {
      immediate: true,
      handler(array) {
        this.updateActions();
        
      }
    },
  }
}
</script>
