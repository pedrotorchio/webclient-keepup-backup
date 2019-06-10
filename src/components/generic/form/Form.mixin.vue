<script>

export default {
  props: {
    model: {
      type: Object | Boolean,
      default: false
    }
  },
  data: () => ({
    form: {}
  }),
  methods: {
    areRequiredFieldsFilled() {
      return !this.REQUIRED_FIELDS || this.REQUIRED_FIELDS.reduce((a, c) => a && Boolean(this.form[c]), true);
    },
    isRequiredField(key, accessor = a => a)  {
      // accessor extracts an array of keys out of the requiredFields Array 
      // usually requiredFields will only be the keys, so the default accessor returns the same array
      // in other words, it returns the requiredFields array as it is

      return this.REQUIRED_FIELDS && this.REQUIRED_FIELDS.includes(accessor(key))
    },
    isCreation() {
      return !(this.model && Boolean(this.model.id));
    }
  },
  watch: {
    model: {
      immediate: true,
      handler() {

        if (this.model) {
          Object.entries(this.model).forEach(([key, value]) => {
            this.form[key] = value;
          });
        }
      }
    }
  }
}
</script>
