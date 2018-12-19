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
      left = left > taskBox.width - 10 ? taskBox.width  : left;
    
      top = pageY - taskBox.top + 10;
      top = top > taskBox.height - 10 ? taskBox.height : top;

      const bWidth = document.body.getBoundingClientRect().width;

      if (pageX > bWidth/2) {




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
