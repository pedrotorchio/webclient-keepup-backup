<script>
export default {
  methods: {
    hover(event) {
      this.$refs.tooltip.show();
    },
    move(event) {
      if (this.editable)
        return;
        
      const { target, pageX, pageY } = event;
      const { left: offsetLeft, top: offsetTop, height, width } = target.getBoundingClientRect();

      let left = pageX - offsetLeft + 10;
          left = left > width - 10 ? width  : left;
      
      let top = pageY - offsetTop + 10;
          top = top > height - 10 ? height : top;

      this.$refs.tooltip.setPosition(left, top);
    },
    hoverOut(event) {
      if (!this.editable)
        this.$refs.tooltip.hide();
    }
  }
}
</script>
