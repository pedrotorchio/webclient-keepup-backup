<script>
export default {
  props: {
    durationScale: {
      type: Function,
      required: true
    },
    independencyScale: {
      type: Function,
      required: true
    },
    momentScale: {
      type: Function,
      required: true
    },
    heightScale: {
      type: Function,
      required: true
    },
    categoryScale: {
      type: Function,
      required: true
    }
  },
  computed: {
    duration() {
      return this.durationScale(this.model.duration);
    },
    independency() {
      return this.independencyScale(this.model.independency);
    },
    moment() {
      return this.momentScale(this.model.time);
    },
    height() {
      return this.heightScale();
    },
    top() {
      return this.categoryScale(this.model.category.slug);
    }
  }
}
</script>
