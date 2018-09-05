<script>
export default {
  name: 'Page',
  methods: {
    onUserFetched() {
      
    }
  },
  created() {
    this.$store.dispatch('checkSession')
        .then(hasSession => this.onUserFetched(hasSession));
  }
}
</script>
