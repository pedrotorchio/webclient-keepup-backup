export default {
  mounted() {
    this.$el.classList.add('root'); 
    
    if (this.$options.name)
      this.$el.classList.add(`${this.$options.name}`);
  }
};
