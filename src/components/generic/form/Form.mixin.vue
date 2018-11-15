<script>

export default {
  props: {
    model: {
      type: Object | Boolean,
      default: false
    }
  },
  data: () => ({
    form: {}
  }),
  watch: {
    model: {
      immediate: true,
      handler() {

        if (this.model) {
          Object.entries(this.model).forEach(([key, value]) => {
            this.form[key] = value;
          });
        }
      }
    }
  }
}
</script>
