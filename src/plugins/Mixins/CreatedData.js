export default {
  methods: {
    resetData( fieldFinder = data => data ) {
      Object.assign(fieldFinder(this.$data), fieldFinder(this.$options.data()));
    },
  }
};