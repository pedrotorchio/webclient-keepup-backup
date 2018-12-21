<script>
export default {
  data: () => ({
    selected: false
  }),
  methods: {
    select() {
      this.selected = !this.selected;
      this.$emit('click', {
        isSelection: this.selected,
        id: this.model.id
      });
      this.setEditable(!this.editable);
    },
    tooltipClick() {
      if (!this.editable)
        this.setEditable(true);
    },
    outClick(eve) {
      
    }
  }
}
</script>
