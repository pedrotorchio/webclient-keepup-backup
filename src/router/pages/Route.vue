<script>
export default {
  name: 'Route',
  computed: {
    ...mapState({
      userData: state => state.auth.user
    }),
    title() {
      if (this.$route.meta && this.$route.meta.title) {
        const title = this.$route.meta.title;

        return title(this.$route, this);
      }

      return false;
    }
  }
}
</script>
