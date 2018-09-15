<script>
import { debounce } from 'debounce';

export default {
  methods: {
    submit: debounce(function(data) {
      this.submitProcedure(data);
    }, 1000),
    async submitProcedure(data) {}
  }
}
</script>
