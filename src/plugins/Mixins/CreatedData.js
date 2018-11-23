export default {
  methods: {
    resetDataValues( fieldFinder = data => data ) {
      Object.assign(fieldFinder(this.$data), fieldFinder(this.$options.data()));
    }
  }
};