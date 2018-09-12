export default {
  data: () => ({
    data__: {}
  }),
  created() {
    const { data__, ...data } = this.$data;
    this.data__ = Object.assign({}, data);
  }
};