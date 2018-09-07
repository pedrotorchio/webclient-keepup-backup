<script>
export default {
  props: ['value'],
  data: () => ({
    model: ''
  }),
  computed: {
    interceptor: {
      set(value) {
        this.model = value;
      },
      get() {
        let value = this.model;
        
        return value;
      }
    }
  },
  created() {
    this.model = this.value;
  }
}
</script>
<template>
  <input type="text" v-model="interceptor" />
</template>

