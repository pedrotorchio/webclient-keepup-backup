<script>

export default {
  props: {
    patients: {
      type: Array,
      required: true
    },
    icon: {
      type: String,
      default: 'move_to_inbox'
    }
  },
  methods: {
    open(patient) {
      this.$emit('open', patient);
    },
    action(id) {
      this.$emit('action', id);
    }
  }
}
</script>


