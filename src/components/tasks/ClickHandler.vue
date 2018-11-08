<script>
export default {
  data: () => ({
    selected: false
  }),
  methods: {
    select() {
      this.selected = !this.selected;
      this.$emit('click', {
        selected: this.selected
      });
    }
  }
}
</script>
