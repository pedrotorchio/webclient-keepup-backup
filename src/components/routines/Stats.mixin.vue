<script>
import Collection from '@/components/generic/collection/Collection';

export default {
  mixins: [ Collection ],
  computed: {
    duration() {
      let duration = 0;
      this.collection.map( task => duration += task.duration );

      return duration;
    }
  }
}
</script>
