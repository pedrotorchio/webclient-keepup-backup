export default {
  data: () => ({
    data__: {}
  }),
  created() {
    const { data__, ...data } = this.$data;
    this.data__ = JSON.parse(JSON.stringify(data));
  }
};