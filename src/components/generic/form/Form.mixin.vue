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
      deep: true,
      handler(data) {
        
        if (data) {
          this.form = Object.assign(this.model, data);
        
        } else {
          this.form = Object.assign(this.form, this.data__.form);
          
        }
        
      }
    }
  }
}
</script>
