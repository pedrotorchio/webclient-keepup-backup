
function log(method) {
  let name = '';
  if (this.$options && this.$options.name)
    name = this.$options.name + ':';

  console.log(`${name} ${method}`);
}

export default {
  created() {
    log.bind(this)('created');
  },
  mounted() {
    log.bind(this)('mounted');
  }
};