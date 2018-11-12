<script>

export default {
  computed: {
    totalDuration() {
      let duration = 0;

      this.collection.map( task => duration += task.duration );

      return duration;
    },
    selectedElements() {
      return this.$refs.tasks.filter( task => task.selected )
    },
    selection() {
      return this.selectedElements.map( el => el.model );
    },
    collection() {
      return this.selection.length > 0 ? this.selection : this.tasks;
    },
  },  
}
</script>
