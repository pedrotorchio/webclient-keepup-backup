<script>
export default {
  methods: {
    hover(event) {
      this.$refs.tooltip.show();
    },
    hoverOut(event) {
      this.$refs.tooltip.hide();
    }
  }
}
</script>
