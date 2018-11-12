<script>

export default {

  computed: {
    totalDuration() {
      let duration = 0;
      this.tasks.map( task => duration += task.duration );

      return duration;
    }
  },

  
}
</script>
