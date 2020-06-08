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
      const taskBox = target.getBoundingClientRect();
      
      let left, top;

      left = pageX - taskBox.left + 10;
    
      top = pageY - taskBox.top + 10;
      top = top > taskBox.height - 10 ? taskBox.height : top;

      const bWidth = document.body.getBoundingClientRect().width;
      const tooltipWidth = this.$refs.tooltip.$el.getBoundingClientRect ? 
        this.$refs.tooltip.$el.getBoundingClientRect().width : 0;
      
      const leftEdge  = 10 - tooltipWidth,
            rightEdge = taskBox.width - 10;

      if (pageX > bWidth/2) {
        // if mouse is on the right
        // invert tooltip position from right to left

        left -= tooltipWidth + 20 ;
        if (left < leftEdge)
          left = -tooltipWidth;
      } else {
        
        if (left > rightEdge)
          left = taskBox.width;
      }


      this.$refs.tooltip.setPosition(left, top);
    },
    hoverOut(event) {
      if (!this.editable)
        this.$refs.tooltip.hide();
    }
  }
}
</script>
