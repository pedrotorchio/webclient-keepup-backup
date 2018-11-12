<script>
export default {
  methods: {
    hover(event) {
      this.$refs.tooltip.show();
    },
    hoverOut(event) {
      if (!this.editable)
        this.$refs.tooltip.hide();
    }
  }
}
</script>
