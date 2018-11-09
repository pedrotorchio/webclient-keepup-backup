export default {
  mounted() {
    
    if (this.$el && this.$el.classList)
      this.$el.classList.add('root'); 
    
    if (this.$options.name)
      this.$el.classList.add(`${this.$options.name}`);
  }
};
