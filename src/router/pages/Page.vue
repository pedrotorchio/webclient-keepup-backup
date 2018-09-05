<script>
export default {
  name: 'Page',
  created() {
    this.$store.dispatch('checkSession');
  }
}
</script>
