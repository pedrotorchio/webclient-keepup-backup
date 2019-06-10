<script>
import { debounce } from 'debounce';

export default {
  methods: {
    submit: debounce(function(data) {

      this.setGlobalLoading(true);
      this.submitProcedure(data);
      this.setGlobalLoading(false);

    }, 1000),
    async submitProcedure(data) {}
  }
}
</script>
