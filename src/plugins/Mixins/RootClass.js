export default {
  mounted() {
    this.$el.classList.add('root'); 
    this.$el.classList.add(`${this.$options.name}`);
  }
};
