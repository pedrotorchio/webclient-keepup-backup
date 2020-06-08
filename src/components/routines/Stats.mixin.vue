<script>

export default {
  data: () => ({
    selectedElements: []
  }),
  computed: {
    totalDuration() {
      let duration = 0;

      this.collection.map( task => duration += task.duration );

      return duration;
    },
    selection() {
      return this.selectedElements.map( el => el.model );
    },
    collection() {
      return this.selection.length > 0 ? this.selection : this.tasks;
    },
  },
  methods: {
    computeSelection() {
      if (!this.$refs.tasks)
        this.selectedElements = [];

      this.selectedElements = this.$refs.tasks.filter( task => task.selected );
    },
    selected({ id, isSelection }) {
      // this.computeSelection();
    }
  }  
}
</script>
