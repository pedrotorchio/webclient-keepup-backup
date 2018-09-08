<script>
import { mapState } from 'vuex';
import Route from './Route';

export default {
  extends: Route,
  name: 'Page',
  created() {
    this.$store.dispatch('checkSession');
  }
}
</script>

