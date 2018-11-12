<script>
export default {
  data: () => ({
    selected: false
  }),
  methods: {
    select() {
      this.selected = !this.selected;
      this.$emit('click', {
        isSelection: this.selected,
        id: this.model.id
      });
    }
  }
}
</script>
