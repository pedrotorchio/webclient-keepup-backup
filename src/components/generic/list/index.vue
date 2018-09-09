<script>

export default {
  props: {
    array: {
      type: Array,
      required: true
    },
    icon: {
      type: String | Boolean,
      default: 'move_to_inbox'
    }
  },
  methods: {
    open(item) {
      this.$emit('open', item);
    },
    action(id) {
      this.$emit('action', id);
    }
  }
}
</script>


